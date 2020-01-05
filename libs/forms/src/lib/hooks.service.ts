import { Injectable } from '@angular/core';

import { FormHook } from './engine.types';

@Injectable({
  providedIn: 'root'
})
export class HooksService {
  formHooks: Map<string, FormHook> = new Map();
}
