import { Injectable } from '@angular/core';

import { FormHook, FormHookRequest, FormHookUpdateOn, HookEntry } from './engine.types';

@Injectable({
  providedIn: 'root'
})
export class HooksService {
  private formHooks: HookEntry<unknown> = new Map();

  clearHooks(){
    this.formHooks = new Map();
  }

  getHook<T>(name: string) {
    return this.formHooks.get(name) as FormHook<T>;
  }

  getHookEntries() {
    return this.formHooks.entries();
  }

  setHook<T>(name: string, request: FormHookRequest<T>): void;

  setHook<T>(
    name: string,
    request: FormHookRequest<T>,
    updateOn: FormHookUpdateOn.ControlChanges,
    control: string
  ): void;

  setHook<T>(
    name: string,
    request: FormHookRequest<T>,
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
