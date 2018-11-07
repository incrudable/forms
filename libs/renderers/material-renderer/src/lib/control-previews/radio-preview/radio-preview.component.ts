import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Control } from '@incrudable/forms';

@Component({
  selector: 'incrudable-radio-preview',
  templateUrl: './radio-preview.component.html',
  styleUrls: ['./radio-preview.component.css']
})
export class RadioPreviewComponent {
  @Input() control?: Control;
  @Input('formControl') formControl = new FormControl();
}
