import { Component, Input } from '@angular/core';
import { RuntimeControl } from '@incrudable/forms';

@Component({
  selector: 'incrudable-date-preview',
  templateUrl: './date-preview.component.html',
  styleUrls: ['./date-preview.component.css']
})
export class DatePreviewComponent {
  @Input() control?: RuntimeControl;
}
