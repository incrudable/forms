import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Control, ControlType } from '@incrudable/forms';

@Component({
  selector: 'incrudable-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss']
})
export class SimpleComponent {
  controlSetTwo: Control[] = [
    { label: 'tinyInput', propertyName: 'tinyInput', type: ControlType.input }
  ];
  myCustomGroup = new FormGroup({});
}
