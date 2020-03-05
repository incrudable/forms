import { Injectable } from '@angular/core';
// import { Validators } from '@angular/forms';

import {
  AsyncCtrlValidatorFn,
  ControlValidator,
  CtrlValidatorFn
} from './engine.types';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  readonly controlValidators: Map<string, ControlValidator> = new Map();

  constructor() {
    this.controlValidators.set('required', {
      async: false,
      failureCode: 'required',
      name: 'required',
      builtIn: true
    });
    this.controlValidators.set('requiredTrue', {
      async: false,
      failureCode: 'requiredTrue',
      name: 'requiredTrue',
      builtIn: true
    });
    this.controlValidators.set('email', {
      async: false,
      failureCode: 'email',
      name: 'email',
      builtIn: true
    });
    this.controlValidators.set('min', {
      async: false,
      failureCode: 'min',
      name: 'min',
      builtIn: true
    });
    this.controlValidators.set('max', {
      async: false,
      failureCode: 'max',
      name: 'max',
      builtIn: true
    });
    this.controlValidators.set('nullValidator', {
      async: false,
      failureCode: 'nullValidator',
      name: 'nullValidator',
      builtIn: true
    });
    this.controlValidators.set('minLength', {
      async: false,
      failureCode: 'minLength',
      name: 'minLength',
      builtIn: true
    });
    this.controlValidators.set('maxLength', {
      async: false,
      failureCode: 'maxLength',
      name: 'maxLength',
      builtIn: true
    });
    this.controlValidators.set('pattern', {
      async: false,
      failureCode: 'pattern',
      name: 'pattern',
      builtIn: true
    });
  }

  addValidator(
    name: string,
    failureCode: string,
    validate: CtrlValidatorFn
  ) {
    this.controlValidators.set(name, {
      async: false,
      failureCode,
      name,
      builtIn: false,
      validate
    });
  }

  addAsyncValidator(
    name: string,
    failureCode: string,
    validate: AsyncCtrlValidatorFn
  ) {
    this.controlValidators.set(name, {
      async: true,
      failureCode,
      name,
      builtIn: false,
      validate
    });
  }

  clearValidator(name: string) {
    this.controlValidators.delete(name);
  }
}
