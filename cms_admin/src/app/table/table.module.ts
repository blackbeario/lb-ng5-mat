import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialTableComponent } from '../shared/components/material-table';
import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from '../shared/material.module';
import { TableRoutingModule } from "./table.routing";


@NgModule({
  imports: [
    MaterialModule,
    SharedModule.forRoot(),
    CommonModule,
    TableRoutingModule
  ],
  declarations: [MaterialTableComponent],
})
export class TableModule { }
