import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlMapping, FormEngineModule } from '@incrudable/forms';
import { NgBootstrapDepsModule } from '@incrudable/ng-bootstrap-deps';

import { InputPreviewComponent } from './control-previews/input-preview/input-preview.component';

const controls: ControlMapping = {
  input: { control: InputPreviewComponent }
};

@NgModule({
  imports: [
    CommonModule,
    FormEngineModule.forRoot(controls),
    NgBootstrapDepsModule,
    ReactiveFormsModule
  ],
  declarations: [InputPreviewComponent],
  exports: [FormEngineModule]
})
export class NgBootstrapRendererModule {}
