import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'getting-started',
    loadChildren: () => import('./getting-started/getting-started.module').then(m => m.GettingStartedModule)
  },
  {
    path: 'custom-layout',
    loadChildren: () => import('./custom-layout/custom-layout.module').then(m => m.CustomLayoutModule)
  },
  {
    path: 'simple',
    loadChildren: () => import('./simple/simple.module').then(m => m.SimpleModule)
  },
  {
    path: 'multi',
    loadChildren: () => import('./multi/multi.module').then(m => m.MultiModule)
  },
  {
    path: 'address',
    loadChildren: () => import('./address/address.module').then(m => m.AddressModule)
  },
  {
    path: 'rest',
    loadChildren: () => import('./rest/rest.module').then(m => m.RestModule)
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
