import { Component, Inject, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ControlMappingToken } from '../control-mapping.injection-token';
import { DynamicHtmlHostComponent } from '../dynamic-html-host/dynamic-html-host.component';
import { Control, ControlMapping, ControlMappingEntry } from '../engine.types';

@Component({
  selector: 'incrudable-control-picker',
  templateUrl: './control-picker.component.html',
  styleUrls: ['./control-picker.component.css']
})
export class ControlPickerComponent {
  @Input()
  set control(value: Control | undefined) {
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
          this.inputs = {
            ...this.inputs,
            control: value
          };
          this.previewControlType = this.controlMappingEntry.control;
        }
      }
    }
  }

  @Input()
  set dynamicControl(value: FormControl | undefined) {
    if (value) {
      if (this.controlMappingEntry && this.controlMappingEntry.selector) {
        this.inputs = {
          ...this.inputs,
          propMap: { ...this.inputs.propMap, formControl: value }
        };
      } else {
        this.inputs = { ...this.inputs, formControl: value };
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
