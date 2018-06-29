import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './shared/auth.guard';
import {RealtimeService} from "./shared/services/core/realtime.service";
import { MaterialTableComponent } from './table/material-table/material-table.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/access',
        pathMatch: 'full'
    },
    {
        path: 'access',
        loadChildren: './access/access.module#AccessModule'
    },
    {
        path: 'users',
        loadChildren: './user/user.module#UserModule'
    },
    {
        path: 'content',
        loadChildren: './node/node.module#NodeModule'
    },
    {
        path: 'table',
        component: MaterialTableComponent
    }
];

export const appRoutingProviders: any[] = [
    AuthGuard,
    RealtimeService
];
export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);