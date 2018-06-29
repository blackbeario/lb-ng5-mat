import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ApiModule } from "./shared/services/api.module";
import { appRoutingProviders, AppRouting } from "./app.routing";
import { SharedModule } from "./shared/shared.module";
import { MaterialModule } from "./shared/material.module";
import { TableModule } from './table/table.module';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    SharedModule.forRoot(),
    ApiModule.forRoot(),
    AppRouting,
    TableModule
  ],
  entryComponents: [AppComponent],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
