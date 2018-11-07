import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DynamicHtmlHostComponent } from './dynamic-html-host.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DynamicHtmlHostComponent],
  exports: [DynamicHtmlHostComponent]
})
export class DynamicHtmlHostModule {}
