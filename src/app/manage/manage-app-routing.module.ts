/**
 * Created by wujiahui on 2018/9/6.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageAppComponent } from './manage-app/manage-app.component';
import { TestMapComponent } from './test-map/test-map.component';
import { AuthRoutingGuardService } from '../core/services/authorization/auth-routing-guard.service';

const ROUTER_CONFIG: Routes = [
    {
        path    : '', component: ManageAppComponent, canActivate: [AuthRoutingGuardService],
        children: [
            {
                path        : 'plan',
                loadChildren: './plan/plan.module#PlanModule',
                data        : { title: '方案管理' },
            },
            {
                path        : 'baseInfo',
                loadChildren: './base-info/base-info.module#BaseInfoModule',
                data        : { title: '基础信息' },
            },
            {
                path        : 'system',
                loadChildren: './system/system.module#SystemModule',
                data        : { title: '系统设置' },
            },
            {
                path: 'testMap', component: TestMapComponent, data: { title: '测试地图' },
            },
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTER_CONFIG),
    ],
    exports: [
        RouterModule
    ],
})
export class ManageAppRoutingModule {
}
