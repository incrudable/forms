import { Component, Input } from '@angular/core';

import { TimeRuntimeControl } from '@incrudable/forms';

@Component({
  selector: 'incrudable-time-preview',
  templateUrl: './time-preview.component.html',
  styleUrls: ['./time-preview.component.scss']
})
export class TimePreviewComponent {
  @Input() control?: TimeRuntimeControl;
}
