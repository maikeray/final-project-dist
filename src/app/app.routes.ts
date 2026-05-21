import { Routes } from '@angular/router';

import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(x => x.AccountModule)
    },
    {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(x => x.ProfileModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(x => x.AdminModule),
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    { path: '**', redirectTo: '' }
];