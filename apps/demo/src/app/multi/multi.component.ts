import { Component } from '@angular/core';
import { Control, ControlType } from '@incrudable/forms';

@Component({
  selector: 'incrudable-multi',
  templateUrl: './multi.component.html',
  styleUrls: ['./multi.component.scss']
})
export class MultiComponent {
  controlSetOne: Control[] = [
    {
      label: 'Min & Max Num',
      propertyName: 'minMaxNum',
      type: ControlType.input,
      controlValidators: [
        {
          name: 'min',
          args: [5],
          failureMessage: 'The value must be between 5 & 10'
        },
        {
          name: 'max',
          args: [10],
          failureMessage: 'The value must be between 5 & 10'
        },
        {
          name: 'pattern',
          args: ['^(0|[1-9][0-9]*)$'],
          failureMessage: 'The value must be a number'
        }
      ]
    },
    {
      label: 'Simple Num',
      propertyName: 'simpleNum',
      type: ControlType.input,
      controlValidators: [
        {
          name: 'simpleNum',
          failureMessage: 'The value must be greater than or equal to 3'
        }
      ]
    },
    {
      label: 'Make a selection here!',
      position: {
        cols: 2,
        rows: 1,
        x: 0,
        y: 2
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
    {
      label: 'Simple Text Input',
      controlValidators: [
        { name: 'required', failureMessage: 'A value is required' }
      ],
      position: {
        cols: 1,
        rows: 1,
        x: 0,
        y: 0
      },
      propertyName: 'textInput',
      type: ControlType.input
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
      label: 'Check Boxes',
      position: {
        cols: 1,
        rows: 2,
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
      label: 'A Date Picker',
      position: {
        cols: 1,
        rows: 1,
        x: 0,
        y: 1
      },
      propertyName: 'dateInput',
      type: ControlType.date
    },
    {
      label: 'A Time Picker',
      position: {
        cols: 1,
        rows: 1,
        x: 0,
        y: 3
      },
      propertyName: 'timeInput',
      type: ControlType.time,
      typeOptions: {
        format: 24
      }
    }
  ];
}
