import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

import {
  AsyncCtrlValidatorFn,
  ControlValidator,
  ValidatorFnWrapper
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
      validate: Validators.required
    });
    this.controlValidators.set('requiredTrue', {
      async: false,
      failureCode: 'requiredTrue',
      name: 'requiredTrue',
      validate: Validators.requiredTrue
    });
    this.controlValidators.set('email', {
      async: false,
      failureCode: 'email',
      name: 'email',
      validate: Validators.email
    });
    this.controlValidators.set('min', {
      async: false,
      failureCode: 'min',
      name: 'min',
      validate: Validators.min
    });
    this.controlValidators.set('max', {
      async: false,
      failureCode: 'max',
      name: 'max',
      validate: Validators.max
    });
    this.controlValidators.set('nullValidator', {
      async: false,
      failureCode: 'nullValidator',
      name: 'nullValidator',
      validate: Validators.nullValidator
    });
    this.controlValidators.set('minLength', {
      async: false,
      failureCode: 'minLength',
      name: 'minLength',
      validate: Validators.minLength
    });
    this.controlValidators.set('maxLength', {
      async: false,
      failureCode: 'maxLength',
      name: 'maxLength',
      validate: Validators.maxLength
    });
    this.controlValidators.set('pattern', {
      async: false,
      failureCode: 'pattern',
      name: 'pattern',
      validate: Validators.pattern
    });
  }

  addValidator(
    name: string,
    failureCode: string,
    validate: ValidatorFnWrapper
  ) {
    this.controlValidators.set(name, {
      async: false,
      failureCode,
      name,
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
      validate
    });
  }

  clearValidator(name: string) {
    this.controlValidators.delete(name);
  }
}
