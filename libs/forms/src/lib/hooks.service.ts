import { Injectable } from '@angular/core';

import { FormHook, FormHookRequest, FormHookUpdateOn } from './engine.types';

@Injectable({
  providedIn: 'root'
})
export class HooksService {
  private formHooks: Map<string, FormHook> = new Map();

  getHook(name: string) {
    return this.formHooks.get(name);
  }

  getHookEntries() {
    return this.formHooks.entries();
  }

  setHook(name: string, request: FormHookRequest): void;

  setHook(
    name: string,
    request: FormHookRequest,
    updateOn: FormHookUpdateOn.ControlChanges,
    control: string
  ): void;

  setHook(
    name: string,
    request: FormHookRequest,
    updateOn: FormHookUpdateOn = FormHookUpdateOn.AllChanges,
    control?: string | string[]
  ) {
    if (formHookControlChangesGuard(updateOn, control)) {
      this.formHooks.set(name, {
        request,
        updateOn,
        control
      });
    } else if (updateOn === FormHookUpdateOn.AllChanges) {
      this.formHooks.set(name, {
        request,
        updateOn
      });
    }
  }
}

// Using this guard to avoid type assertions in the setHook function
function formHookControlChangesGuard(
  updateOn: FormHookUpdateOn,
  _control: string | string[] | undefined
): _control is string | string[] {
  return updateOn === FormHookUpdateOn.ControlChanges;
}
