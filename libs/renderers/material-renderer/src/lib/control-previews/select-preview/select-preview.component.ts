import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Control } from '@incrudable/forms';

@Component({
  selector: 'incrudable-select-preview',
  templateUrl: './select-preview.component.html',
  styleUrls: ['./select-preview.component.css']
})
export class SelectPreviewComponent {
  @Input() control?: Control;
  @Input('formControl') formControl = new FormControl();
}
