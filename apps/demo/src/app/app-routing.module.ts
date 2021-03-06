import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'getting-started',
    loadChildren:
      './getting-started/getting-started.module#GettingStartedModule'
  },
  {
    path: 'custom-layout',
    loadChildren: './custom-layout/custom-layout.module#CustomLayoutModule'
  },
  {
    path: 'simple',
    loadChildren: './simple/simple.module#SimpleModule'
  },
  {
    path: 'multi',
    loadChildren: './multi/multi.module#MultiModule'
  },
  {
    path: 'address',
    loadChildren: './address/address.module#AddressModule'
  },
  {
    path: 'rest',
    loadChildren: './rest/rest.module#RestModule'
  },
  {
    path: '**',
    redirectTo: 'getting-started'
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
