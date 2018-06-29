import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from '../shared/material.module';
import { TableRoutingModule } from "./table.routing";
import { MaterialTableComponent } from './material-table/material-table.component';


@NgModule({
  imports: [
    MaterialModule,
    SharedModule.forRoot(),
    CommonModule
  ],
  declarations: [MaterialTableComponent],
})
export class TableModule {}
