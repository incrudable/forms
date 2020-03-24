import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlMapping, FormEngineModule } from '@incrudable/forms';
import { NgBootstrapDepsModule } from '@incrudable/ng-bootstrap-deps';

import { CheckboxPreviewComponent } from './control-previews/checkbox-preview/checkbox-preview.component';
import { DatePreviewComponent } from './control-previews/date-preview/date-preview.component';
import { InputPreviewComponent } from './control-previews/input-preview/input-preview.component';
import { RadioPreviewComponent } from './control-previews/radio-preview/radio-preview.component';
import { SelectPreviewComponent } from './control-previews/select-preview/select-preview.component';

const controls: ControlMapping = {
  input: { control: InputPreviewComponent },
  date: { control: DatePreviewComponent },
  checkGroup: { control: CheckboxPreviewComponent },
  radioGroup: { control: RadioPreviewComponent },
  select: { control: SelectPreviewComponent }
};

@NgModule({
  imports: [
    CommonModule,
    FormEngineModule.forRoot(controls),
    NgBootstrapDepsModule,
    ReactiveFormsModule
  ],
  declarations: [
    InputPreviewComponent,
    DatePreviewComponent,
    CheckboxPreviewComponent,
    RadioPreviewComponent,
    SelectPreviewComponent
  ],
  exports: [FormEngineModule]
})
export class NgBootstrapRendererModule {}
