import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './shared/auth.guard';
import {RealtimeService} from "./shared/services/core/realtime.service";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/users',
        pathMatch: 'full'
    },
    {
        path: 'access',
        loadChildren: './access/access.module#AccessModule'
    },
    {
        path: 'users',
        loadChildren: './user/user.module#UserModule'
    }
];

export const appRoutingProviders: any[] = [
    AuthGuard,
    RealtimeService
];
export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);