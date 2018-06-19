import {NgModule} from '@angular/core';
import {NodesComponent} from './nodes/nodes.component';
import {NodeRoutingModule} from "./node.routing";
import {SharedModule} from "../shared/shared.module";
import {NodeFormComponent} from './node-form/node-form.component';
import { MaterialModule } from '../shared/material.module';


@NgModule({
    imports: [
        MaterialModule,
        SharedModule.forRoot(),
        NodeRoutingModule
    ],
    declarations: [NodesComponent, NodeFormComponent],
    entryComponents: [NodeFormComponent]
})
export class NodeModule {


}
