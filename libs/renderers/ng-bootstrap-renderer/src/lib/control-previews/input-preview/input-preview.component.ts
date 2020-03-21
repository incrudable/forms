import { Component, Input } from '@angular/core';
import { ControlValidator, InputRunTimeControl } from '@incrudable/forms';

@Component({
  selector: 'incrudable-input-preview',
  templateUrl: './input-preview.component.html',
  styleUrls: ['./input-preview.component.scss']
})
export class InputPreviewComponent {
  @Input('control') set _control(control: InputRunTimeControl | undefined) {
    this.control = control;
    this.validators = control?.validators || [];
  }
  control: InputRunTimeControl | undefined;
  validators: ControlValidator[] = [];

  constructor() {}
}
