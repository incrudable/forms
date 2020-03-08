import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RenderersMaterialRendererModule } from '@incrudable/material-form-renderer';

import { AddressComponent } from './address.component';

const routes: Routes = [{ path: '', component: AddressComponent }];

@NgModule({
  declarations: [AddressComponent],
  imports: [
    CommonModule,
    RenderersMaterialRendererModule,
    RouterModule.forChild(routes)
  ]
})
export class AddressModule {}
