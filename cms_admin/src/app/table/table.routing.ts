import { NgModule }                from '@angular/core';
import { RouterModule, Routes }    from '@angular/router';
import { AuthGuard } from "../shared/auth.guard";
import { MaterialTableComponent } from './material-table/material-table.component';

const TableRoutes: Routes = [
    {
        path: '',
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
