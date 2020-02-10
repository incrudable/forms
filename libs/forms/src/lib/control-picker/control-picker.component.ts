import { Component, Inject, Input } from '@angular/core';

import { ControlMappingToken } from '../control-mapping.injection-token';
import { DynamicHtmlHostComponent } from '../dynamic-html-host/dynamic-html-host.component';
import {
  ControlMapping,
  ControlMappingEntry,
  RuntimeControl
} from '../engine.types';

@Component({
  selector: 'incrudable-control-picker',
  templateUrl: './control-picker.component.html',
  styleUrls: ['./control-picker.component.css']
})
export class ControlPickerComponent {
  @Input()
  set control(value: RuntimeControl | undefined) {
    if (value) {
      this.controlMappingEntry = this.controlMapping[value.type];
      if (this.controlMappingEntry) {
        // Control is a WebComponent
        if (this.controlMappingEntry.selector) {
          this.inputs = {
            selector: this.controlMappingEntry.selector,
            propMap: {
              ...this.inputs,
              control: value
            }
          };
          this.previewControlType = DynamicHtmlHostComponent;
        } else {
          this.inputs = { control: value };
          this.previewControlType = this.controlMappingEntry.control;
        }
      }
    }
  }

  // TODO: figure out types
  inputs: any;
  previewControlType: any | undefined;
  controlMappingEntry: ControlMappingEntry | undefined;
  constructor(
    @Inject(ControlMappingToken) private controlMapping: ControlMapping
  ) {}
}
