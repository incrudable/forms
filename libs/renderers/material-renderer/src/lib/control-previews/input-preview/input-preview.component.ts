import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Control } from '@incrudable/forms';

@Component({
  selector: 'incrudable-input-preview',
  templateUrl: './input-preview.component.html',
  styleUrls: ['./input-preview.component.css']
})
export class InputPreviewComponent {
  @Input() control?: Control;
  @Input('formControl') formControl = new FormControl();
}
