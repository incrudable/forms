import { AbstractControl, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { GridsterItem } from 'angular-gridster2';
import { Observable } from 'rxjs';

export enum ControlType {
  input = 'input',
  select = 'select',
  date = 'date',
  checkGroup = 'checkGroup',
  radioGroup = 'radioGroup',
  time = 'time'
}

// Interface describing a control
// This is the serializable definition
// that can be be persisted to a backend
export interface Control {
  // Name(s) of validator(s) to apply to the control
  controlValidators?: string[];
  label: string;
  position?: GridsterItem;
  // identifier used to store the value of the control
  propertyName: string;
  // user friendly name that appears as a label to end users
  type: ControlType;
  typeOptions?: TypeOptions;
}

// Interface describing a control after it has
// been "hydrated". For example, validator names
// that are found in "Control" are replaced with
// ControlValidators that include the validation method
// It will also have the native Angular Form Control attached
// to it for simplicity sake
export interface RuntimeControl extends Control {
  formControl: AbstractControl;
  validators: ControlValidator[];
}

export interface BaseControlValidator {
  name: string;
  failureMessage: string;
  failureCode: string;
  async: boolean;
  builtIn: boolean;
}

export type CtrlValidatorFn = (rtControl: RuntimeControl) => boolean;
export type AsyncCtrlValidatorFn = (
  rtControl: RuntimeControl
) => Observable<boolean>;

export interface SyncControlValidator extends BaseControlValidator {
  async: false;
  validate: CtrlValidatorFn | ValidatorFn;
}

export interface AsyncControlValidator extends BaseControlValidator {
  async: true;
  validate: AsyncCtrlValidatorFn | AsyncValidatorFn;
}

export type ControlValidator = SyncControlValidator | AsyncControlValidator;

export interface GridData extends GridsterItem {
  control: Control;
}

interface TypeOptions {
  options?: Option[];
  optionSource: 'static' | 'dynamic';
  optionSourceHook: string;
}

export interface Option {
  label: string;
  propertyName: string;
  value: any;
}

export type FormHook = () => Observable<any>;

export interface ControlMappingEntry {
  control?: any; // Component for rendering this type of control
  selector?: string;
  // TODO: determine which properties a control must implement,
  propertyMap?: {};
}

export type ControlMapping = { [K in ControlType]?: ControlMappingEntry };
