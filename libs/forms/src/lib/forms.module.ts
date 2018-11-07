import { CommonModule } from '@angular/common';
import { ANALYZE_FOR_ENTRY_COMPONENTS, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridsterModule } from 'angular-gridster2';
import { DynamicModule } from 'ng-dynamic-component';

import { ControlMappingToken } from './control-mapping.injection-token';
import { ControlPickerComponent } from './control-picker/control-picker.component';
import { DynamicHtmlHostComponent } from './dynamic-html-host/dynamic-html-host.component';
import { DynamicHtmlHostModule } from './dynamic-html-host/dynamic-html-host.module';
import { ControlMapping } from './engine.types';
import { FormRendererComponent } from './form-renderer/form-renderer.component';

@NgModule({
  declarations: [FormRendererComponent, ControlPickerComponent],
  exports: [FormRendererComponent, ControlPickerComponent],
  imports: [
    CommonModule,
    GridsterModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicHtmlHostModule,
    DynamicModule.withComponents([])
  ]
})
export class FormEngineModule {
  static forRoot(controlMap: ControlMapping, controlList: any[]) {
    return {
      ngModule: FormEngineModule,
      providers: [
        { provide: ControlMappingToken, useValue: controlMap },
        {
          provide: ANALYZE_FOR_ENTRY_COMPONENTS,
          useValue: [...controlList, DynamicHtmlHostComponent],
          multi: true
        }
      ]
    };
  }
}
