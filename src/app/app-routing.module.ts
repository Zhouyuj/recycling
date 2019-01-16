/**
 * Created by wujiahui on 2018/9/5.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';

const ROUTER_CONFIG: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/manage/monitor' },
    {
        path        : 'login',
        loadChildren: './login/login.module#LoginModule',
        data        : { title: '登录' },
    },
    {
        path        : 'manage',
        loadChildren: './manage/manage-app.module#ManageAppModule',
    },
    { path: '**', redirectTo: '/manage/baseInfo/staffs' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTER_CONFIG),
    ],
    exports: [
        RouterModule,
    ]
})
export class AppRoutingModule {
}
