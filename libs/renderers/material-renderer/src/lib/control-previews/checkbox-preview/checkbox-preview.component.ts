import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RuntimeControl } from '@incrudable/forms';

@Component({
  selector: 'incrudable-checkbox-preview',
  templateUrl: './checkbox-preview.component.html',
  styleUrls: ['./checkbox-preview.component.css']
})
export class CheckboxPreviewComponent {
  @Input() control?: RuntimeControl;
  @Input('formControl') formGroup?: FormGroup = new FormGroup({});
}
