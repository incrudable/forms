import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RenderersMaterialRendererModule } from '@incrudable/material-form-renderer';

import { MultiComponent } from './multi.component';

const routes: Routes = [{ path: '', component: MultiComponent }];

@NgModule({
  declarations: [MultiComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RenderersMaterialRendererModule
  ]
})
export class MultiModule {}
