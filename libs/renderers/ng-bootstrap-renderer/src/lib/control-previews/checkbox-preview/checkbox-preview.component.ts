import { Component, Input } from '@angular/core';
import { CheckGroupRuntimeControl } from '@incrudable/forms';

@Component({
  selector: 'incrudable-checkbox-preview',
  templateUrl: './checkbox-preview.component.html',
  styleUrls: ['./checkbox-preview.component.css']
})
export class CheckboxPreviewComponent {
  @Input() control?: CheckGroupRuntimeControl;
}
