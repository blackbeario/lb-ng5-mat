import {NgModule}                from '@angular/core';
import {RouterModule, Routes}    from '@angular/router';
import {AuthGuard} from "../shared/auth.guard";
import { MaterialTableComponent } from '../shared/components/material-table';

const TableRoutes: Routes = [
    {
        path: 'table',
        component: MaterialTableComponent,
        canActivate: [AuthGuard],

    }
];

@NgModule({
    imports: [
        RouterModule.forChild(TableRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class TableRoutingModule {

}

