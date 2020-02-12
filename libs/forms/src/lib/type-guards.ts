import {
  CheckGroupRuntimeControl,
  ControlType,
  DateRunTimeControl,
  InputRunTimeControl,
  RadioGroupRuntimeControl,
  RuntimeControl,
  SelectRuntimeControl,
  TimeRunTimeControl
} from './engine.types';

export function isInputRuntimeControl(
  runtimeControl?: RuntimeControl
): runtimeControl is InputRunTimeControl {
  return (
    !!runtimeControl &&
    runtimeControl.type === ControlType.input &&
    !!runtimeControl.formControl
  );
}

export function isSelectRuntimeControl(
  runtimeControl?: RuntimeControl
): runtimeControl is SelectRuntimeControl {
  return (
    !!runtimeControl &&
    runtimeControl.type === ControlType.select &&
    !!runtimeControl.formControl
  );
}

export function isDateRuntimeControl(
  runtimeControl?: RuntimeControl
): runtimeControl is DateRunTimeControl {
  return (
    !!runtimeControl &&
    runtimeControl.type === ControlType.date &&
    !!runtimeControl.formControl
  );
}

export function isTimeRuntimeControl(
  runtimeControl?: RuntimeControl
): runtimeControl is TimeRunTimeControl {
  return (
    !!runtimeControl &&
    runtimeControl.type === ControlType.time &&
    !!runtimeControl.formControl
  );
}

export function isCheckGroupRuntimeControl(
  runtimeControl?: RuntimeControl
): runtimeControl is CheckGroupRuntimeControl {
  return (
    !!runtimeControl &&
    runtimeControl.type === ControlType.checkGroup &&
    !!runtimeControl.formControl
  );
}

export function isRadioGroupRuntimeControl(
  runtimeControl?: RuntimeControl
): runtimeControl is RadioGroupRuntimeControl {
  return (
    !!runtimeControl &&
    runtimeControl.type === ControlType.radioGroup &&
    !!runtimeControl.formControl
  );
}
