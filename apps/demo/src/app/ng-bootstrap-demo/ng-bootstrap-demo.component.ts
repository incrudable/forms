import { Component, OnInit } from '@angular/core';
import { Control, ControlType } from '@incrudable/forms';

@Component({
  selector: 'incrudable-ng-bootstrap-demo',
  templateUrl: './ng-bootstrap-demo.component.html',
  styleUrls: ['./ng-bootstrap-demo.component.css']
})
export class NgBootstrapDemoComponent implements OnInit {

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
  ];

  constructor() { }

  ngOnInit() {
  }
}
