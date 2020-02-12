import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidatorFn
} from '@angular/forms';
import { cloneDeep, isEqual } from 'lodash';
import { combineLatest, forkJoin, Observable, of, ReplaySubject } from 'rxjs';
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
  Control,
  ControlValidator,
  CtrlValidatorFn,
  FormHook,
  GridData,
  Option,
  RuntimeControl,
  SyncControlValidator
} from '../engine.types';
import { HooksService } from '../hooks.service';
import {
  isCheckGroupRuntimeControl,
  isSelectRuntimeControl
} from '../type-guards';
import { ValidatorsService } from '../validators.service';

@Injectable({
  providedIn: 'root'
})
export class FormRendererService {
  // The Angular Form group representing the users form
  dynamicForm = new FormGroup({});
  runtimeControls: Observable<RuntimeControl[]>;
  private controlChanges = new ReplaySubject<Control[]>(1);

  constructor(
    private hooksService: HooksService,
    private validatorsService: ValidatorsService
  ) {
    this.runtimeControls = combineLatest(
      [
        this.dynamicForm.valueChanges.pipe(
          startWith(this.dynamicForm.value),
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
        ),
        this.controlChanges
      ]
      // May soon need form def as well
    ).pipe(
      switchMap(([formValues, controls]) =>
        this.genRtControls(formValues, controls)
      )
    );
  }

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
    _form: any,
    control: RuntimeControl
  ): Observable<RuntimeControl> {
    let optionListHook: FormHook | undefined;
    if (
      isSelectRuntimeControl(control) &&
      control.typeOptions?.optionSource === 'dynamic'
    ) {
      optionListHook = this.hooksService.formHooks.get(
        control.typeOptions.optionSourceHook
      );
      if (!optionListHook) {
        throw new Error(
          'Unable to find hook: ' +
            control.typeOptions.optionSourceHook +
            ' in ' +
            this.hooksService.formHooks
        );
      }
      return optionListHook().pipe(
        map(optionList => {
          if (control.typeOptions) {
            control.typeOptions.options = optionList;
          }
          return control;
        })
      );
    }
    return of(control);
  }

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
      const existingControl = this.dynamicForm.get(control.propertyName);
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
    for (const field in this.dynamicForm.controls) {
      // ... if not add them to a list of controls to remove
      if (!controls.find(ctrlItr => ctrlItr.propertyName === field)) {
        oldControlList.push(field);
      }
    }

    // perform the removal
    oldControlList.forEach(propertyName =>
      this.dynamicForm.removeControl(propertyName)
    );

    newControlList.forEach((ctrl, propertyName) => {
      this.dynamicForm.addControl(propertyName, ctrl);
    });

    // Step 4 add intra form behaviors (updateOn, setWith, dynamic options, etc)
    // Don't currently have any
    // Step 5 make sure state and value changes trigger
    // TBD
  }
}

export function convertFormToGridItems(controls: RuntimeControl[]) {
  return controls.map(control => {
    const gridItem = control.position as GridData;
    delete control.position;
    return { ...gridItem, control };
  });
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
