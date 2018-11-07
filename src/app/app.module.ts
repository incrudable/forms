import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material';
import { GridsterModule } from 'angular-gridster2';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlListComponent } from './control-list/control-list.component';
import { ControlDetailsComponent } from './control-details/control-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlListComponent,
    ControlDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatButtonModule,
    GridsterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
