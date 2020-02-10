import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

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
    this.controlValidators.set('Required', {
      async: false,
      failureCode: 'required',
      failureMessage: 'A value is required',
      name: 'Required',
      validate: Validators.required,
      builtIn: true
    });
  }

  addValidator(
    name: string,
    failureCode: string,
    failureMessage: string,
    validate: CtrlValidatorFn
  ) {
    this.controlValidators.set(name, {
      async: false,
      failureCode,
      failureMessage,
      name,
      builtIn: false,
      validate
    });
  }

  addAsyncValidator(
    name: string,
    failureCode: string,
    failureMessage: string,
    validate: AsyncCtrlValidatorFn
  ) {
    this.controlValidators.set(name, {
      async: true,
      failureCode,
      failureMessage,
      name,
      builtIn: false,
      validate
    });
  }

  clearValidator(name: string) {
    this.controlValidators.delete(name);
  }
}
