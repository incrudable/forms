import { Control, ControlType } from '@incrudable/forms';

export interface ShippingFormOuput {
  first_name: string;
  last_name: string;
  street1: string;
  street2: string;
  country: string;
  state: string;
  city: string;
  zip: string;
}

export const shippingFormControls: Control[] = [
  {
    label: 'First Name',
    propertyName: 'first_name',
    type: ControlType.input,
    // Nothing shows up when I do this?
    // I feel like validators should be treated as objects so an error message PER control can be passed in
    //  along with the validators name & any possible arguments that the validator requires.
    // Angular native validators from `Validators` should be added manually in the ValidatorService's constructor
    //  the same way a consumer would add them, that way we can treat all validators generically
    //  whether they are actual validator functions, functions that return validator functions, or Angular provided ones.
    // That way we don't have to internally manage how the inBuilt ones work with a switch or w/e
    controlValidators: [
      { name: 'required', failureMessage: 'First name is required' }
    ],
    position: {
      x: 0,
      y: 0,
      rows: 1,
      cols: 1
    }
  },
  {
    label: 'Last Name',
    propertyName: 'last_name',
    type: ControlType.input,
    controlValidators: [
      { name: 'required', failureMessage: 'Last name is required' }
    ],
    position: {
      x: 1,
      y: 0,
      rows: 1,
      cols: 1
    }
  },
  {
    label: 'Street Address',
    propertyName: 'street1',
    type: ControlType.input,
    controlValidators: [
      { name: 'required', failureMessage: 'Street address is required' }
    ],
    position: {
      x: 0,
      y: 1,
      rows: 1,
      cols: 1
    }
  },
  {
    label: 'Street Address 2',
    propertyName: 'street2',
    type: ControlType.input,
    controlValidators: [
      { name: 'required', failureMessage: 'Street address is required' }
    ],
    position: {
      x: 1,
      y: 1,
      rows: 1,
      cols: 1
    }
  },
  {
    label: 'Country',
    propertyName: 'country',
    type: ControlType.select,
    typeOptions: {
      optionSource: 'dynamic',
      optionSourceHook: 'countryOptions'
    },
    controlValidators: [
      { name: 'required', failureMessage: 'Country is required' }
    ],
    position: {
      x: 0,
      y: 2,
      rows: 1,
      cols: 1
    }
  },
  {
    label: 'State',
    propertyName: 'state',
    type: ControlType.select,
    typeOptions: {
      optionSource: 'dynamic',
      optionSourceHook: 'stateOptions'
    },
    controlValidators: [
      { name: 'required', failureMessage: 'State is required' }
    ],
    position: {
      x: 1,
      y: 2,
      rows: 1,
      cols: 1
    }
  },
  {
    label: 'City',
    propertyName: 'city',
    type: ControlType.input,
    controlValidators: [
      { name: 'required', failureMessage: 'City is required' }
    ],
    position: {
      x: 0,
      y: 3,
      rows: 1,
      cols: 1
    }
  },
  {
    label: 'ZIP Code',
    propertyName: 'zip',
    type: ControlType.input,
    controlValidators: [
      { name: 'required', failureMessage: 'Zip Code is required' }
    ],
    position: {
      x: 1,
      y: 3,
      rows: 1,
      cols: 1
    }
  }
];
