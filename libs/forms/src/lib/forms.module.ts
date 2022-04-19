import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridsterModule } from 'angular-gridster2';

import { ControlMappingToken } from './control-mapping.injection-token';
import { ControlPickerComponent } from './control-picker/control-picker.component';
import { CompHostDirective } from './control-picker/control-picker.component';
import { DynamicHtmlHostModule } from './dynamic-html-host/dynamic-html-host.module';
import { ControlMapping } from './engine.types';
import { FormRendererComponent } from './form-renderer/form-renderer.component';

@NgModule({
  declarations: [FormRendererComponent, ControlPickerComponent, CompHostDirective],
  exports: [FormRendererComponent, ControlPickerComponent],
  imports: [
    CommonModule,
    GridsterModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicHtmlHostModule,
  ],
})
export class FormEngineModule {
  static forRoot(
    controlMap: ControlMapping
  ): ModuleWithProviders<FormEngineModule> {
    return {
      ngModule: FormEngineModule,
      providers: [{ provide: ControlMappingToken, useValue: controlMap }],
    };
  }
}
