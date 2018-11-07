import { InjectionToken } from '@angular/core';

import { ControlMapping } from './engine.types';

export const ControlMappingToken = new InjectionToken<ControlMapping>(
  'ControlMappingToken'
);
