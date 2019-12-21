import { FormControl } from '@angular/forms';
import { GridsterItem } from 'angular-gridster2';
import { Observable } from 'rxjs';

export interface Form {
  id: string;
  name: string;
}

export enum ControlType {
  input = 'input',
  select = 'select',
  date = 'date',
  checkGroup = 'checkGroup',
  radioGroup = 'radioGroup'
}

export interface Control {
  id: string;
  // user friendly name that appears in admin controls
  name: string;
  // identifier used to store the value of the control
  propertyName: string;
  // user friendly name that appears as a label to end users
  label: string;
  position?: GridsterItem;
  type: ControlType;
  typeOptions?: TypeOptions;
}

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

export interface RuntimeControl extends Control {
  formControl: FormControl;
  typeOptions: TypeOptions;
}

export type NgxFormHook = () => Observable<any>;

export interface ControlMappingEntry {
  control?: any;
  selector?: string;
  // TODO: determine which properties a control must implement,
  propertyMap?: {};
}

export type ControlMapping = { [K in ControlType]?: ControlMappingEntry };
