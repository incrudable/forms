import { Control, ControlType, Option } from '../engine.types';

// This file contains the rules that validate a form schema
// This is not directly related to Angular Form Validation
// but can be utilized as necessary to implement form validation
// where appropriate

/**
 * Inspects a control to determine if the definition is valid
 *
 * This is the core logic that determines validity
 * Correctness currently consists of:
 * * Verifying that all required properties are present
 * * Verifying that the TypeOptions are well formed
 *
 * @param control control to be inspected
 */
export function controlDefValid(control: Control): boolean {
  return (
    !!control.type &&
    !!control.propertyName &&
    !!control.label &&
    hasValidTypeOptions(control)
  );
}

/**
 * Inspects the definition of all controls to determine if the
 * form is valid. This will likely grow to include form level
 * checks.
 *
 * This is the core logic that determines validity
 * Correctness currently consists of:
 * * Validating the presence of controls
 * * Validating that each control is well formed
 * * Validating that the control list does not contain duplicate property names
 *
 * @param controls list of controls to be inspected
 */
export function formDefValid(controls: Control[]): boolean {
  let valid = true;
  if (!controls) {
    return false;
  }
  controls.forEach(control => {
    if (!controlDefValid(control)) {
      valid = false;
    }
  });
  return valid && hasNoDuplicatePropertyNames(controls);
}

/**
 * Inspects a list of controls and determines if there
 * are at least two controls sharing the same propertyName
 * @param controls list of controls to be inspected
 */
function hasNoDuplicatePropertyNames(controls: Control[]) {
  let result = true;
  controls.forEach(outterControl => {
    const res = controls.filter(
      control => control.propertyName === outterControl.propertyName
    );
    if (res.length > 1) {
      result = false;
    }
  });
  return result;
}

/**
 * Inspects the TypeOptions portion of a control's schema
 * to verify that it is correct
 *
 * Correctness currently consists of:
 * * validation that the options list is correct
 *
 * @param control control to be verified
 */
function hasValidTypeOptions(control: Control) {
  if (
    control.type === ControlType.radioGroup ||
    control.type === ControlType.checkGroup
  ) {
    if (control.typeOptions) {
      // type options (other than option lists) will be verified here
      if (control.typeOptions.options) {
        return validateOptions(control.typeOptions.options);
      }
    }
  }
  return true;
}

/**
 * Looks at the list of options to determine if they are correctly formed.
 *
 * Correctness currently consists of:
 * * Option list does not contain any duplicate propertyName values
 *
 * @param options List of options to inspect
 */
function validateOptions(options: Option[]) {
  let noDups = true;
  options.forEach(outterOption =>
    options.forEach(innerOption => {
      if (
        innerOption !== outterOption &&
        innerOption.propertyName === outterOption.propertyName
      ) {
        noDups = false;
      }
    })
  );
  return noDups;
}
