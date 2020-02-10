import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Control } from '@incrudable/forms';

@Component({
  selector: 'incrudable-time-preview',
  templateUrl: './time-preview.component.html',
  styleUrls: ['./time-preview.component.scss']
})
export class TimePreviewComponent {
  @Input() control?: Control;
  @Input('formControl') formControl = new FormControl();
}
