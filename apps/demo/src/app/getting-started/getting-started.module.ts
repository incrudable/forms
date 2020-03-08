import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowdownModule } from 'ngx-showdown';
import highlightExtension from 'showdown-highlight';

import { GettingStartedComponent } from './getting-started.component';

const routes: Routes = [{ path: '', component: GettingStartedComponent }];

@NgModule({
  declarations: [GettingStartedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShowdownModule.forRoot({
      emoji: true,
      noHeaderId: true,
      flavor: 'github',
      extensions: [highlightExtension]
    })
  ]
})
export class GettingStartedModule {}
