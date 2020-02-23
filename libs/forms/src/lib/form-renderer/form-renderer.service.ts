import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isEqual } from 'lodash';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';

import { Control, GridData, RuntimeControl } from '../engine.types';
import { HooksService } from '../hooks.service';
import { ValidatorsService } from '../validators.service';

import { FormState } from './form-state';

@Injectable({
  providedIn: 'root'
})
/**
 * The FormRendererService establishes a collection of
 * FormStates. This FormStates are instanced based upon the
 * FormRendererComponents that need them.
 */
export class FormRendererService {
  /**
   * Used to hold the mapping from instance ID to FormState
   */
  private formGroupInstanceMap: Map<string, FormState> = new Map();

  constructor(
    private hooksService: HooksService,
    private validatorsService: ValidatorsService
  ) {}

  /**
   * Often times the consumers of the FormRendererComponent will
   * wish to supply their own FormGroup. In those cases it is
   * neccessary to update the base FormGroup. All observable
   * references related to the underlying FormGroup are maintained
   * by the FormState class.
   *
   * If a user has already called and retained an observable from
   * this method, it is unlikely they would need to retain a second
   * return value as the runtimeControls reference does not
   * change after instantiation.
   *
   * @param id Instance ID to operate on
   * @param formGroup new FormGroup to associate with the instance
   * When left undefined, setFormForInstance will create and use a
   * new FormGroup instead.
   * @returns Gridster runtime controls used for rendering.
   */
  setFormForInstance(id: string, formGroup: FormGroup = new FormGroup({})) {
    // Either uses the existing instance or makes a new instance
    // of FormState for the given id.
    let formState = this.formGroupInstanceMap.get(id);
    if (formState) {
      formState.updateFormGroup(formGroup);
    } else {
      formState = new FormState(
        this.hooksService,
        this.validatorsService,
        formGroup
      );
      this.formGroupInstanceMap.set(id, formState);
    }

    // After setting the group, use this instances runtimeControls
    // to form the GridItems needed by components. Though the
    // reference to this observable does not change, and multiple
    // calls will return the same source observable, this is added
    // as a convienence to consumers.
    return formState.runtimeControls.pipe(
      distinctUntilChanged(isEqual),
      map(convertFormToGridItems),
      shareReplay(1)
    );
  }

  /**
   * Similar to setFormForInstances, updateControls is often
   * called when a consumer has a need to swap out the list and/or
   * definitions of controls.
   *
   * If a user has already called and retained an observable from
   * this method, it is unlikely they would need to retain a second
   * return value as the runtimeControls reference does not
   * change after instantiation.
   *
   * @param id Instance ID to operate on
   * @param controls Control definitions to be processed by the
   * FormState
   */
  updateControls(id: string, controls: Control[]) {
    // Either uses the existing instance or makes a new instance
    // of FormState for the given id.
    let formState = this.formGroupInstanceMap.get(id);
    if (!formState) {
      formState = new FormState(
        this.hooksService,
        this.validatorsService,
        new FormGroup({})
      );
      this.formGroupInstanceMap.set(id, formState);
    }
    formState.updateControls(controls);

    // Just like setFormForInstance...
    // After setting the group, use this instances runtimeControls
    // to form the GridItems needed by components. Though the
    // reference to this observable does not change, and multiple
    // calls will return the same source observable, this is added
    // as a convienence to consumers.
    return formState.runtimeControls.pipe(
      distinctUntilChanged(isEqual),
      map(convertFormToGridItems),
      shareReplay(1)
    );
  }

  /**
   * Clears the map entry, helpful when tearing down renderers associated
   * with a single component
   * @param id Form instance id to remove
   */
  removeForm(id: string) {
    this.formGroupInstanceMap.delete(id);
  }
}

/**
 * Gridster has a particularly hairy edge around the data that it
 * expects to receive. This function will move the inner positioning
 * properties to the top level object so that gridster can find them.
 * The remaining control properties are stored on a separate property
 * to be sent to the incrudable renderer
 * @param controls list of controls as manipulated by FormState
 */
function convertFormToGridItems(controls: RuntimeControl[]) {
  return controls.map(control => {
    const gridItem = control.position as GridData;
    delete control.position;
    return { ...gridItem, control };
  });
}
