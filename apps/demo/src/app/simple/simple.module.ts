import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RenderersMaterialRendererModule } from '@incrudable/material-form-renderer';

import { SimpleComponent } from './simple.component';

const routes: Routes = [{ path: '', component: SimpleComponent }];

@NgModule({
  declarations: [SimpleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RenderersMaterialRendererModule
  ]
})
export class SimpleModule {}
