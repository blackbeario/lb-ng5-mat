import { NgModule } from '@angular/core';
import { AccessComponent } from "./access.component";
import { AccessRoutingModule } from "./access.routing";
import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from '../shared/material.module';

@NgModule({
    imports: [
        AccessRoutingModule,
        MaterialModule,
        SharedModule.forRoot()
    ],
    declarations: [AccessComponent]
})
export class AccessModule {

}
