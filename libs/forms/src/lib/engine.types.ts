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

// Interface describing a control
// This is the serializable definition
// that can be be persisted to a backend
export interface BaseControl {
  // Name(s) of validator(s) to apply to the control
  controlValidators?: string[];
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

export type InputRuntimeControl = BaseRuntimeControl & InputControl;
export type SelectRuntimeControl = BaseRuntimeControl & SelectControl;
export type DateRuntimeControl = BaseRuntimeControl & DateControl;
export type TimeRuntimeControl = BaseRuntimeControl & TimeControl;
export type CheckGroupRuntimeControl = BaseRuntimeControl & CheckGroupControl;
export type RadioGroupRuntimeControl = BaseRuntimeControl & RadioGroupControl;

export type RuntimeControl =
  | InputRuntimeControl
  | SelectRuntimeControl
  | DateRuntimeControl
  | TimeRuntimeControl
  | CheckGroupRuntimeControl
  | RadioGroupRuntimeControl;

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

export interface Option {
  label: string;
  propertyName: string;
  value: any;
}

export enum FormHookUpdateOn {
  AllChanges,
  ControlChanges
}

// Hooks need to support any form structure supplied by
// users of the libraries. They are also a generic mechanism.
// So we cannot determine what comes back, but we can use
// a generic type
export type FormHookRequest<T> = (form: any) => Observable<T>;

// Works with FormHookRequest type to provide additional
// meta data associated with the request function. Used as part of the
// internal definition
export interface FormHookBase<T> {
  request: FormHookRequest<T>;
  updateOn: FormHookUpdateOn;
}

export interface UpdateOnAllChangesFormHook<T> extends FormHookBase<T> {
  updateOn: FormHookUpdateOn.AllChanges;
}

export interface UpdateOnControlChangeFormHook<T> extends FormHookBase<T> {
  updateOn: FormHookUpdateOn.ControlChanges;
  control: string | string[];
}

export type FormHook<T> =
  | UpdateOnAllChangesFormHook<T>
  | UpdateOnControlChangeFormHook<T>;

// Used to simplify the type name of the registry
export type HookEntry<T> = Map<string, FormHook<T>>;

export interface ControlMappingEntry {
  control?: any; // Component for rendering this type of control
  selector?: string;
  // TODO: determine which properties a control must implement,
  propertyMap?: {};
}

export type ControlMapping = { [K in ControlType]?: ControlMappingEntry };
