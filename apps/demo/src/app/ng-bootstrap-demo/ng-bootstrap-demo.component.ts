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
    {
      label: 'Check Boxes',
      position: {
        cols: 1,
        rows: 1,
        x: 1,
        y: 0
      },
      propertyName: 'checkBoxes',
      type: ControlType.checkGroup,
      typeOptions: {
        optionSource: 'static',
        optionSourceHook: '',
        options: [
          {
            label: 'Option 3',
            propertyName: 'opThree',
            value: 'op3'
          },
          {
            label: 'Option 2',
            propertyName: 'opTwo',
            value: 'op2'
          },
          {
            label: 'Option 1',
            propertyName: 'opOne',
            value: 'op1'
          }
        ]
      }
    },
    {
      label: 'Only one please!',
      position: {
        cols: 1,
        rows: 3,
        x: 2,
        y: 0
      },
      propertyName: 'radioInput',
      type: ControlType.radioGroup,
      typeOptions: {
        optionSource: 'static',
        optionSourceHook: '',
        options: [
          {
            label: 'Pineapple',
            propertyName: 'pineapple',
            value: 'pineapple'
          },
          {
            label: 'Kiwi',
            propertyName: 'kiwi',
            value: 'kiwi'
          },
          {
            label: 'Orange',
            propertyName: 'orange',
            value: 'orange'
          },
          {
            label: 'Grapes',
            propertyName: 'grapes',
            value: 'grapes'
          },
          {
            label: 'Apples',
            propertyName: 'apples',
            value: 'apples'
          }
        ]
      }
    },
    {
      label: 'Make a selection here!',
      position: {
        cols: 1,
        rows: 1,
        x: 1,
        y: 1
      },
      propertyName: 'selectInput',
      type: ControlType.select,
      typeOptions: {
        optionSource: 'static',
        optionSourceHook: '',
        options: [
          {
            label: 'Good',
            propertyName: 'good',
            value: 'good'
          },
          {
            label: 'Bad',
            propertyName: 'bad',
            value: 'bad'
          },
          {
            label: 'Fair',
            propertyName: 'fair',
            value: 'fair'
          }
        ]
      }
    },
  ];

  constructor() { }

  ngOnInit() {
  }
}
