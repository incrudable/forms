import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidatorFn
} from '@angular/forms';
import { cloneDeep, isEqual } from 'lodash';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  Observable,
  of,
  ReplaySubject
} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  take,
  tap
} from 'rxjs/operators';

import {
  AsyncControlValidator,
  AsyncCtrlValidatorFn,
  CheckGroupRuntimeControl,
  Control,
  ControlValidator,
  CtrlValidatorFn,
  FormHook,
  FormHookUpdateOn,
  Option,
  RadioGroupRuntimeControl,
  RuntimeControl,
  SelectRuntimeControl,
  SyncControlValidator
} from '../engine.types';
import { HooksService } from '../hooks.service';
import {
  isCheckGroupRuntimeControl,
  isRadioGroupRuntimeControl,
  isSelectRuntimeControl
} from '../type-guards';
import { ValidatorsService } from '../validators.service';

/**
 * FormState keeps track of the Angular FormGroup associated with a form
 * and its runtime state. It understands the relationship between a forms's
 * definition, its current state and the value and structure changes over
 * time. It produces an observable of the runtime state for consumption by
 * a renderer
 *
 * No DI here because we are working with multiple instances per module
 */
export class FormState {
  /**
   * The Angular FormGroup that contains the form state at runtime
   **/
  formGroup: FormGroup;

  /**
   * The list of control definitions at runtime. This is the Form's overall
   * state.
   */
  runtimeControls: Observable<RuntimeControl[]>;

  /**
   * Trigger indicating when an outside source has changed the control
   * definition list. This works better than a standalone method because
   * it composes with other Observable data sources. In our case, we need
   * to expose an observable whose reference doesn't change. We can switchmap
   * on controlChanges as needed
   */
  private controlChanges = new ReplaySubject<Control[]>(1);

  /**
   * Similar rationale as controlChanges, but for changes to the base
   * FormGroup.
   */
  private formUpdate: BehaviorSubject<FormGroup>;

  private oldFormValue: any | undefined;

  /**
   * Establishes the runtimeControls observable that represents a form's state
   * @param hooksService A reference to an instance of hookService.
   * Called as form values and definitions change
   * @param validatorsService A reference to an instance of validatorsService.
   * Called as form values and definitions change.
   * @param formGroup The formGroup to use as the base for the runtime form state
   */
  constructor(
    private hooksService: HooksService,
    private validatorsService: ValidatorsService,
    formGroup: FormGroup
  ) {
    this.formGroup = formGroup;
    this.formUpdate = new BehaviorSubject(this.formGroup);
    // Brings together form value changes and control definition changes
    // As either of these change we need to recompute the state.
    this.runtimeControls = combineLatest(
      [
        // The form value changes are not as simple as just .valueChanges.
        // The form itself can change overtime. So look for changes to the group
        // then switch to the groups valueChanges
        this.formUpdate.pipe(
          switchMap(fg =>
            fg.valueChanges.pipe(
              startWith(fg.value),
              distinctUntilChanged(isEqual),
              // TODO: be very careful with this fix
              // Each time a control is programatically added, it triggers a valueChange
              // That value change, in turn causes this pipeline to run again. Without the debounceTime()
              // it would start a second pipeline in parallel that would also add controls to the formGroup.
              // While the process would eventually diverge it takes a lot of resources and was potentially buggy
              // By adding the debounceTime(), so long as the machine is fast enough, this causes the pipeline
              // to wait until all the controls are added before processing the list one more.

              // Even with this in place, it is possible to create an infinite loop of hooks
              debounceTime(100)
            )
          )
        ),
        this.controlChanges
      ]
      // May soon need form def as well
    ).pipe(
      // genRtControls calls the formHooks to establish the complete
      // runtime definition. So we need to switch to it
      switchMap(([formValues, controls]) => {
        const runTimeControls = this.genRtControls(formValues, controls);
        this.oldFormValue = formValues;
        return runTimeControls;
      }),
      map(controls =>
        controls.sort((first, second) => {
          const firstHasPosition = typeof first.position?.y === 'number';
          const secondHasPosition = typeof second.position?.y === 'number';
          if (firstHasPosition && !secondHasPosition) {
            return -1;
          } else if (secondHasPosition && !firstHasPosition) {
            return 1;
          } else if (!secondHasPosition && !firstHasPosition) {
            return 0;
          } else if (
            typeof first.position?.y === 'number' &&
            typeof second.position?.y === 'number'
          ) {
            const sameRow = first.position?.y === second.position?.y;
            if (sameRow) {
              return first.position.x - second.position.x;
            } else {
              return first.position.y - second.position.y;
            }
          } else {
            return 0;
          }
        })
      )
    );
  }

  /**
   * Replaces the existing formGroup and triggers an update to the
   * appropriate pipelines.
   *
   * @param formGroup new FormGroup to be used as the base state.
   */
  updateFormGroup(formGroup: FormGroup) {
    this.formGroup = formGroup;
    this.formUpdate.next(this.formGroup);
  }

  /**
   * Replaces the control definition and triggers an update to the
   * appropriate pipelines.
   * @param controls new control definition
   */
  updateControls(controls: Control[]) {
    this.controlChanges.next(controls);
  }

  /**
   * Based on a control definition this will apply any changes needed for the control
   * to be useful at runtime. For example, it will execute any hooks based upon the schema
   * definition for a control and the current form values. This will unpack things such
   * as a dynamic list of options and add it to the definition.
   *
   * @param form current form values
   * @param ctrls list of controls undergoing a conversion
   */
  genRtControls(form: any, ctrls: Control[]): Observable<RuntimeControl[]> {
    // Avoid mutations of the original list
    const rtControls: RuntimeControl[] = cloneDeep(ctrls).map(staticCtrl => {
      const validators: ControlValidator[] = staticCtrl.controlValidators
        ?.map(validator =>
          this.validatorsService.controlValidators.get(validator)
        )
        .filter(validator => !!validator) as ControlValidator[];
      return {
        ...staticCtrl,
        validators,
        formControl: new FormControl()
      };
    });

    // Execute all of the hooks as needed for each control and gather them back up
    const controlWithHookResults: Observable<
      RuntimeControl
    >[] = rtControls.map(control => this.runHooks(form, control).pipe(take(1)));

    return forkJoin(controlWithHookResults).pipe(
      tap(controls => this.updateGroup(controls))
    );
  }

  /**
   * Examines the state of the form and the control schema to determine
   * which hooks should be executed, does so, then adds the results back
   * to the runtime control
   *
   * @param _form current form values, not currently needed. Will be soon
   * @param control control containing the hooks to run
   */
  private runHooks(
    form: any,
    control: RuntimeControl
  ): Observable<RuntimeControl> {
    let optionListHook: FormHook | undefined;
    // Currently only selects, radio groups, & check groups have dynamic options (hooks)
    if (
      (isSelectRuntimeControl(control) ||
        isRadioGroupRuntimeControl(control) ||
        isCheckGroupRuntimeControl(control)) &&
      control.typeOptions?.optionSource === 'dynamic'
    ) {
      // fetching the hook from the consumer defined list
      optionListHook = this.hooksService.getHook(
        control.typeOptions.optionSourceHook
      );
      // throw error if user has dynamic set, but didn't provide a hook name/didn't setup or provide the hook
      if (!optionListHook) {
        throw new Error(
          'Unable to find hook: ' +
            control.typeOptions.optionSourceHook +
            ' in ' +
            this.hooksService.getHookEntries()
        );
      }
      // check to see if the hook should actually be called:
      // `AllChanges` will always run the request when any change in the form occurs
      // `ControlChange` will only run when the specified control(s) change value in the form
      if (
        optionListHook.updateOn === FormHookUpdateOn.AllChanges ||
        (optionListHook.updateOn === FormHookUpdateOn.ControlChanges &&
          checkIfBoundControlsChanged(
            this.oldFormValue,
            form,
            optionListHook.control
          ))
      ) {
        // call the hook request function with the current value of the form
        // then update the typeOptions on the RuntimeControl with the options array from the request
        return optionListHook
          .request(form)
          .pipe(setTypeOptionsOnControl(control));
      }
    }
    return of(control);
  }

  /**
   * Interprets a RuntimeControl definition and applies an Angular validator
   * to its corresponding Angular Form Control.
   *
   * @param control Control definition of target to validate
   * @param abstractControl Angular control to attach validator to
   */
  attachValidators(control: RuntimeControl, abstractControl: AbstractControl) {
    if (control.validators && control.validators?.length > 0) {
      // Map from validator names to array of Control validators

      const ngValidators: ValidatorFn[] = (control.validators.filter(
        validator => !validator.async
      ) as SyncControlValidator[]).map(validator => {
        if (validator.builtIn) {
          return validator.validate as ValidatorFn;
        } else {
          return (_ac: AbstractControl) => {
            if (
              !((validator as SyncControlValidator)
                .validate as CtrlValidatorFn)(control)
            ) {
              const errors: { [key: string]: string } = {};
              errors[validator.failureCode] = validator.failureMessage;
              return errors;
            } else {
              return null;
            }
          };
        }
      });

      const asyncNgValidators: AsyncValidatorFn[] = (control.validators.filter(
        validator => validator.async
      ) as AsyncControlValidator[]).map(validators => {
        if (validators.builtIn) {
          return validators.validate as AsyncValidatorFn;
        } else {
          return (_ac: AbstractControl) => {
            return (validators.validate as AsyncCtrlValidatorFn)(control).pipe(
              map(valid => {
                if (!valid) {
                  const errors: { [key: string]: string } = {};
                  errors[validators.failureCode] = validators.failureMessage;
                  return errors;
                } else {
                  return null;
                }
              })
            );
          };
        }
      });
      abstractControl.setValidators(ngValidators);
      abstractControl.setAsyncValidators(asyncNgValidators);
    }
  }

  /**
   * The heart of the system
   * This method will calculate an Angular FormGroup
   * from a schema. It will also calculate any intra-form
   * behaviors.
   *
   * @param controls List of controls associated with the target
   * form
   */
  updateGroup(controls: RuntimeControl[]) {
    // Step 1 remove old, invalid form level validation
    // We don't currently have form level validation
    // Step 2 calculate new form level validation
    // We don't currently have form level validation
    // Step 3 determine which controls should be added/updated
    const newControlList = new Map<string, AbstractControl>();
    controls.forEach(control => {
      const existingControl = this.formGroup.get(control.propertyName);
      // We have a control so update it in place
      if (existingControl) {
        this.attachValidators(control, existingControl);
        control.formControl = existingControl;
      } else {
        // No control so add it to the list of controls to be added
        // some controls are more complex than others so build it up before
        // adding it to the list
        const newControl = buildControl(control);
        this.attachValidators(control, newControl);
        newControlList.set(control.propertyName, newControl);
        control.formControl = newControl;
      }
    });
    // Step 4 remove any unused controls
    const oldControlList: string[] = [];
    // loop through existing controls looking to see
    // if they are in the update form control collection
    for (const field in this.formGroup.controls) {
      // ... if not add them to a list of controls to remove
      if (!controls.find(ctrlItr => ctrlItr.propertyName === field)) {
        oldControlList.push(field);
      }
    }

    // perform the removal
    oldControlList.forEach(propertyName =>
      this.formGroup.removeControl(propertyName)
    );

    newControlList.forEach((ctrl, propertyName) => {
      this.formGroup.addControl(propertyName, ctrl);
    });

    // Step 4 add intra form behaviors (updateOn, setWith, dynamic options, etc)
    // Don't currently have any
    // Step 5 make sure state and value changes trigger
    // TBD
  }
}

/**
 * Examines the definition of a control and creates an Angular
 * control from it. This is especially useful for situations
 * where a single control needs multiple FormControls, I.E checkboxes
 *
 * At the moment, checkbox is the only kind of control that falls into this category
 * @param control control to convert
 */
function buildControl(control: RuntimeControl): AbstractControl {
  if (isCheckGroupRuntimeControl(control)) {
    const group = new FormGroup({});
    let options: Option[];
    options = control.typeOptions?.options || [];
    options.forEach(option => {
      // For each option (checkbox) add a new form control
      group.addControl(option.propertyName, new FormControl());
    });
    return group;
  }
  return new FormControl();
}

/**
 * Custom RxJS operator that returns back a modified RunTimeControl
 * based on the Option[] data flowing through the source observable
 *
 * @param control control to set typeOptions on
 */
function setTypeOptionsOnControl(
  control:
    | SelectRuntimeControl
    | RadioGroupRuntimeControl
    | CheckGroupRuntimeControl
) {
  return (
    source: Observable<Option[]>
  ): Observable<
    SelectRuntimeControl | RadioGroupRuntimeControl | CheckGroupRuntimeControl
  > =>
    source.pipe(
      map(optionList => {
        if (control.typeOptions) {
          control.typeOptions.options = optionList;
        }
        return control;
      })
    );
}

/**
 * Checks to see if the control(s) have changed values between the old & new form values
 *
 * @param oldFormValue the old form value
 * @param formValue the new form value
 * @param control the control(s) that are being checked for changes
 */
function checkIfBoundControlsChanged(
  oldFormValue: any,
  formValue: any,
  control: string | string[]
) {
  const controls: string[] = typeof control === 'string' ? [control] : control;
  return !controls.some(c => oldFormValue?.[c] === formValue?.[c]);
}
