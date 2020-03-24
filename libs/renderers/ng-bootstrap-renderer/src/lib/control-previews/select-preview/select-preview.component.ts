import { Component, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { SelectRuntimeControl } from '@incrudable/forms';

@Component({
  selector: 'incrudable-select-preview',
  templateUrl: './select-preview.component.html',
  styleUrls: ['./select-preview.component.css']
})
export class SelectPreviewComponent implements ControlValueAccessor {
  @Input() control?: SelectRuntimeControl;
  selectedOption: string | undefined;

  onChange: ((_: any) => {}) | undefined;

  writeValue(value: string) {
    this.selectedOption = value;
  }

  registerOnChange(fn: (_: any) => {}) {
    this.onChange = fn;
  }

  changeSelectedOption (option: string) {
    this.selectedOption = option;
    if (this.onChange) {
      this.onChange(option);
    }
  }

  registerOnTouched() {}
}
