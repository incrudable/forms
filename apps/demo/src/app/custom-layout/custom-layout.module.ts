import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RenderersMaterialRendererModule } from '@incrudable/material-form-renderer';

import { CustomLayoutComponent } from './custom-layout.component';

const routes: Routes = [{ path: '', component: CustomLayoutComponent }];

@NgModule({
  declarations: [CustomLayoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RenderersMaterialRendererModule
  ]
})
export class CustomLayoutModule {}
