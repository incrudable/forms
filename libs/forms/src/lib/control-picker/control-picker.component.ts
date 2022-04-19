import { Component, Directive, Inject, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

import { ControlMappingToken } from '../control-mapping.injection-token';
import { DynamicHtmlHostComponent } from '../dynamic-html-host/dynamic-html-host.component';
import {
  ControlMapping,
  ControlMappingEntry,
  RuntimeControl
} from '../engine.types';

@Directive({
  selector: '[compHost]'
})
export class CompHostDirective{
  constructor(public viewContainerRef: ViewContainerRef) { }
}
@Component({
  selector: 'incrudable-control-picker',
  templateUrl: './control-picker.component.html',
  styleUrls: ['./control-picker.component.css']
})
export class ControlPickerComponent {

  @ViewChild(CompHostDirective, { static: true }) compHost!: CompHostDirective;

  @Input()
  set control(value: RuntimeControl | undefined) {
    if (value && this.compHost) {
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
        this.loadComponent();
      }
    }
  }

  // TODO: figure out types
  inputs: any;
  previewControlType: any | undefined;
  controlMappingEntry: ControlMappingEntry | undefined;

  ngOnInit(){
    this.loadComponent();
  }
  constructor(
    @Inject(ControlMappingToken) private controlMapping: ControlMapping
  ) {}

  loadComponent(){
    const viewContainerRef = this.compHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(this.previewControlType);
    (componentRef.instance as any).control = this.inputs.control;
  }
}
