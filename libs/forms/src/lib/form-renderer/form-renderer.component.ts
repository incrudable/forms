import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridsterConfig } from 'angular-gridster2';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Control, RuntimeControl } from '../engine.types';

import {
  convertFormToGridItems,
  FormRendererService
} from './form-renderer.service';

@Component({
  selector: 'incrudable-renderer',
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.css']
})
export class FormRendererComponent {
  @Input()
  set controls(value: Control[] | undefined) {
    if (value) {
      this.frs.updateControls(value);
    }
  }

  gridItems: Observable<{ control: RuntimeControl }[]>;

  options: GridsterConfig = {
    gridType: 'fixed',
    fixedColWidth: 200,
    fixedRowHeight: 100,
    draggable: {
      enabled: false
    }
  };

  dynamicForm: FormGroup;

  constructor(private frs: FormRendererService) {
    this.gridItems = frs.runtimeControls.pipe(map(convertFormToGridItems));
    this.dynamicForm = frs.dynamicForm;
  }

  trackItems(_index: number, item: { control: RuntimeControl }) {
    return item.control.propertyName;
  }
}
