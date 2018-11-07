import { InjectionToken } from '@angular/core';

import { NgxFormsHook } from './hook-registration.types';

export const HookRegistration = new InjectionToken<NgxFormsHook>(
  'HookRegistration'
);
