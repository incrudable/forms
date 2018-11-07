import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Control } from '@incrudable/forms';

@Component({
  selector: 'incrudable-date-preview',
  templateUrl: './date-preview.component.html',
  styleUrls: ['./date-preview.component.css']
})
export class DatePreviewComponent {
  @Input() control?: Control;
  @Input('formControl') formControl = new FormControl();
}
