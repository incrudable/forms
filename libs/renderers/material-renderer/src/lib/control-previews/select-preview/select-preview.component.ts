import { Component, Input } from '@angular/core';
import { SelectRuntimeControl } from '@incrudable/forms';

@Component({
  selector: 'incrudable-select-preview',
  templateUrl: './select-preview.component.html',
  styleUrls: ['./select-preview.component.css']
})
export class SelectPreviewComponent {
  @Input() control?: SelectRuntimeControl;
}
