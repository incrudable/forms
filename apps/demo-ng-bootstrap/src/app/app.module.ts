import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgBootstrapRendererModule } from '@incrudable/renderers/ng-bootstrap-renderer';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgBootstrapRendererModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
