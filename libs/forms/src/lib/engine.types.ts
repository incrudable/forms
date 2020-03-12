import { AbstractControl, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { GridsterItem } from 'angular-gridster2';
import { Observable } from 'rxjs';

export enum ControlType {
  input = 'input',
  select = 'select',
  date = 'date',
  time = 'time',
  checkGroup = 'checkGroup',
  radioGroup = 'radioGroup'
}

export interface ValidatorInfo {
  name: string;
  args?: any[];
  failureMessage: string;
}

// Interface describing a control
// This is the serializable definition
// that can be be persisted to a backend
export interface BaseControl {
  // Name(s) of validator(s) to apply to the control
  controlValidators?: ValidatorInfo[];
  // user friendly name that appears as a label to end users
  label: string;
  position?: GridsterItem;
  // identifier used to store the value of the control
  propertyName: string;
  type: ControlType;
}

export interface InputControl extends BaseControl {
  type: ControlType.input;
}

export interface SelectOptions {
  options?: Option[];
  optionSource: 'static' | 'dynamic';
  optionSourceHook: string;
}
export interface SelectControl extends BaseControl {
  type: ControlType.select;
  typeOptions?: SelectOptions;
}

export interface DateControl extends BaseControl {
  type: ControlType.date;
}

export interface TimeOptions {
  format: number; // 12 or 24 hour format
}
export interface TimeControl extends BaseControl {
  type: ControlType.time;
  typeOptions?: TimeOptions;
}

export type CheckGroupOptions = SelectOptions;

export interface CheckGroupControl extends BaseControl {
  type: ControlType.checkGroup;
  typeOptions?: CheckGroupOptions;
}

export type RadioGroupOptions = SelectOptions;
export interface RadioGroupControl extends BaseControl {
  type: ControlType.radioGroup;
  typeOptions: RadioGroupOptions;
}

export type Control =
  | InputControl
  | SelectControl
  | DateControl
  | TimeControl
  | CheckGroupControl
  | RadioGroupControl;

// Interface describing a control after it has
// been "hydrated". For example, validator names
// that are found in "Control" are replaced with
// ControlValidators that include the validation method
// It will also have the native Angular Form Control attached
// to it for simplicity sake
export interface BaseRuntimeControl extends BaseControl {
  formControl: AbstractControl;
  validators: ControlValidator[];
}

export type InputRunTimeControl = BaseRuntimeControl & InputControl;
export type SelectRuntimeControl = BaseRuntimeControl & SelectControl;
export type DateRunTimeControl = BaseRuntimeControl & DateControl;
export type TimeRunTimeControl = BaseRuntimeControl & TimeControl;
export type CheckGroupRuntimeControl = BaseRuntimeControl & CheckGroupControl;
export type RadioGroupRuntimeControl = BaseRuntimeControl & RadioGroupControl;

export type RuntimeControl =
  | InputRunTimeControl
  | SelectRuntimeControl
  | DateRunTimeControl
  | TimeRunTimeControl
  | CheckGroupRuntimeControl
  | RadioGroupRuntimeControl;

export interface BaseControlValidator {
  name: string;
  failureMessage?: string;
  failureCode: string;
  async: boolean;
}

export type ValidatorFnWrapper = (...args: any[]) => ValidatorFn;
export type AsyncValidatorFnWrapper = (...args: any[]) => AsyncValidatorFn;

export type AsyncCtrlValidatorFn = (
  rtControl: RuntimeControl
) => Observable<boolean>;

export interface SyncControlValidator extends BaseControlValidator {
  async: false;
  validate?: ValidatorFn | ValidatorFnWrapper;
}

export interface AsyncControlValidator extends BaseControlValidator {
  async: true;
  validate: AsyncCtrlValidatorFn | AsyncValidatorFn | AsyncValidatorFnWrapper;
}

export type ControlValidator = SyncControlValidator | AsyncControlValidator;

export interface GridData extends GridsterItem {
  control: Control;
}

export interface Option {
  label: string;
  propertyName: string;
  value: any;
}

export enum FormHookUpdateOn {
  AllChanges,
  ControlChanges
}

export type FormHookRequest = (form: any) => Observable<any>;

export interface FormHookBase {
  request: FormHookRequest;
  updateOn: FormHookUpdateOn;
}

export interface UpdateOnAllChangesFormHook extends FormHookBase {
  updateOn: FormHookUpdateOn.AllChanges;
}

export interface UpdateOnControlChangeFormHook extends FormHookBase {
  updateOn: FormHookUpdateOn.ControlChanges;
  control: string | string[];
}

export type FormHook =
  | UpdateOnAllChangesFormHook
  | UpdateOnControlChangeFormHook;

export interface ControlMappingEntry {
  control?: any; // Component for rendering this type of control
  selector?: string;
  // TODO: determine which properties a control must implement,
  propertyMap?: {};
}

export type ControlMapping = { [K in ControlType]?: ControlMappingEntry };
