import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlMapping, FormEngineModule } from '@incrudable/forms';
import { MaterialDepsModule } from '@incrudable/material-deps';

import { CheckboxPreviewComponent } from './control-previews/checkbox-preview/checkbox-preview.component';
import { DatePreviewComponent } from './control-previews/date-preview/date-preview.component';
import { InputPreviewComponent } from './control-previews/input-preview/input-preview.component';
import { RadioPreviewComponent } from './control-previews/radio-preview/radio-preview.component';
import { SelectPreviewComponent } from './control-previews/select-preview/select-preview.component';
import { TextareaPreviewComponent } from './control-previews/textarea-preview/textarea-preview.component';
import { TimePreviewComponent } from './control-previews/time-preview/time-preview.component';

const controls: ControlMapping = {
  input: { control: InputPreviewComponent },
  textarea: { control: TextareaPreviewComponent },
  select: { control: SelectPreviewComponent },
  radioGroup: { control: RadioPreviewComponent },
  checkGroup: { control: CheckboxPreviewComponent },
  date: { control: DatePreviewComponent },
  time: { control: TimePreviewComponent }
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormEngineModule.forRoot(controls),
    MaterialDepsModule
  ],
  declarations: [
    InputPreviewComponent,
    SelectPreviewComponent,
    RadioPreviewComponent,
    CheckboxPreviewComponent,
    DatePreviewComponent,
    TimePreviewComponent,
    TextareaPreviewComponent
  ],
  exports: [FormEngineModule]
})
export class RenderersMaterialRendererModule {}
