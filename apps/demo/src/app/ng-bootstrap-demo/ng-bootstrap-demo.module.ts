import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgBootstrapRendererModule } from '@incrudable/renderers/ng-bootstrap-renderer';

import { NgBootstrapDemoComponent } from './ng-bootstrap-demo.component';

const routes: Routes = [{ path: '', component: NgBootstrapDemoComponent }];

@NgModule({
  declarations: [NgBootstrapDemoComponent],
  imports: [
    CommonModule,
    NgBootstrapRendererModule,
    RouterModule.forChild(routes)
  ]
})
export class NgBootstrapDemoModule { }
