import { Component } from '@angular/core';
import { Control, ControlType } from '@incrudable/forms';

@Component({
  selector: 'incrudable-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo-ng-bootstrap';

  controls: Control[] = [
    {
      label: 'Input Test',
      propertyName: 'input_test',
      type: ControlType.input,
      controlValidators: ['required'],
      position: {
        x: 0,
        y: 0,
        rows: 1,
        cols: 1
      }
    },
    {
      label: 'Datepicker Test',
      propertyName: 'dp_test',
      type: ControlType.date,
      controlValidators: ['required'],
      position: {
        x: 1,
        y: 0,
        rows: 1,
        cols: 1
      }
    },
  ];
}
