import { Component, Input } from '@angular/core';
import {
  ControlValidator,
  TextareaRuntimeControl
} from '@incrudable/forms/src';

@Component({
  selector: 'incrudable-textarea-preview',
  templateUrl: './textarea-preview.component.html',
  styleUrls: ['./textarea-preview.component.scss']
})
export class TextareaPreviewComponent {
  @Input('control') set _control(control: TextareaRuntimeControl | undefined) {
    this.control = control;
    this.validators = control?.validators || [];
  }
  control: TextareaRuntimeControl | undefined;
  validators: ControlValidator[] = [];

  constructor() {}
}
