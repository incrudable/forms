import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GridsterModule } from 'angular-gridster2';
import { DynamicModule } from 'ng-dynamic-component';

import { Control } from '@incrudable/forms';

import { ControlPickerComponent } from '../control-picker/control-picker.component';

import { FormRendererComponent } from './form-renderer.component';

describe('FormRendererComponent', () => {
  let component: FormRendererComponent;
  let fixture: ComponentFixture<FormRendererComponent>;

  beforeAll(async(() => {
    TestBed.configureTestingModule({
      // Wait until Ivy is default library build
      // approach to flip this switch
      // tslint:disable-next-line: deprecation
      imports: [GridsterModule, DynamicModule.withComponents([])],
      declarations: [ControlPickerComponent, FormRendererComponent]
    }).compileComponents();
  }));

  beforeAll(() => {
    fixture = TestBed.createComponent(FormRendererComponent);
    component = fixture.componentInstance;
    component.controls = [
      {
        label: 'Control 1',
        propertyName: 'controlOne',
        type: 'input'
      } as Control
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an input element', () => {
    const hostElement = fixture.nativeElement;
    const nameInput: HTMLInputElement = hostElement.querySelector('input');
    expect(nameInput).toBeTruthy();
    console.log('nameInput', nameInput);
  });
});
