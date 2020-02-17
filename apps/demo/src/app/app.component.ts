import { Component } from '@angular/core';
import {
  ControlType,
  FormRendererService,
  ValidatorsService,
  RuntimeControl
} from '@incrudable/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public formService: FormRendererService,
    public validatorService: ValidatorsService
  ) {
    this.validatorService.addValidator(
      'simpleNum',
      'simpleNum',
      'Number must be greater or equal to 3',
      (control: RuntimeControl) => {
        return control.formControl.value >= 3;
      }
    );
  }
  // Control Definitions
  controls = [
    {
      label: 'Simple Num',
      propertyName: 'simpleNum',
      type: ControlType.input,
      controlValidators: ['simpleNum']
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
      id: 'JvRmL5eyUVWDPSGLiWrI',
      label: 'Simple Text Input',
      name: 'Simple Text Input',
      controlValidators: ['required'],
      position: {
        cols: 1,
        rows: 1,
        x: 0,
        y: 0
      },
      propertyName: 'textInput',
      type: 'input',
      typeOptions: {
        optionSource: 'static',
        optionSourceHook: ''
      }
    },
    {
      id: 'awoffrVfmmN3eMn4l8FP',
      label: 'Only one please!',
      name: 'Radio',
      position: {
        cols: 1,
        rows: 3,
        x: 2,
        y: 0
      },
      propertyName: 'radioInput',
      type: 'radioGroup',
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
      id: 'uebSoIAa60CaLzWZBIQQ',
      label: 'Check Boxes',
      name: 'check boxes',
      position: {
        cols: 1,
        rows: 2,
        x: 1,
        y: 0
      },
      propertyName: 'checkBoxes',
      type: 'checkGroup',
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
      id: 'wEdQPK7ggmsifjhgaaDk',
      label: 'A Date Picker',
      name: 'Simple Date Picker',
      position: {
        cols: 1,
        rows: 1,
        x: 0,
        y: 1
      },
      propertyName: 'dateInput',
      type: 'date',
      typeOptions: {
        optionSource: 'static',
        optionSourceHook: ''
      }
    },
    {
      id: 's9kasW0kawjaIkaw87sU',
      label: 'A Time Picker',
      name: 'Simple Time Picker',
      position: {
        cols: 1,
        rows: 1,
        x: 0,
        y: 3
      },
      propertyName: 'timeInput',
      type: 'time',
      typeOptions: {
        optionSource: 'static',
        optionSourceHook: ''
      }
    }
  ];

  logFormState() {
    console.log(
      this.formService.dynamicForm,
      this.validatorService.controlValidators.get('required')
    );
  }
}