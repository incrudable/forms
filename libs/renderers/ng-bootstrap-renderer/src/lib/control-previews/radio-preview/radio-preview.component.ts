import { Component, Input } from '@angular/core';
import { RadioGroupRuntimeControl } from '@incrudable/forms';

@Component({
  selector: 'incrudable-radio-preview',
  templateUrl: './radio-preview.component.html',
  styleUrls: ['./radio-preview.component.css']
})
export class RadioPreviewComponent {
  @Input() control?: RadioGroupRuntimeControl;
}
