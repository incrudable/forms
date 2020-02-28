import { Component, Input } from '@angular/core';
import { ControlValidator, InputRuntimeControl } from '@incrudable/forms';

@Component({
  selector: 'incrudable-input-preview',
  templateUrl: './input-preview.component.html',
  styleUrls: ['./input-preview.component.css']
})
export class InputPreviewComponent {
  @Input('control') set _control(control: InputRuntimeControl | undefined) {
    this.control = control;
    this.validators = control?.validators || [];
  }
  control: InputRuntimeControl | undefined;
  validators: ControlValidator[] = [];

  constructor() {}
}
