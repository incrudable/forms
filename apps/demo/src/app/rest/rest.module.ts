import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RestComponent } from './rest.component';

const routes: Routes = [{ path: '', component: RestComponent }];

@NgModule({
  declarations: [RestComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class RestModule {}
