/**
 * Created by wujiahui on 2018/9/6.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManageAppComponent } from './manage-app.component';
import { TestMapComponent } from './test-map/test-map.component';
import { MonitorComponent } from './monitor/monitor.component';

import { AuthRoutingGuardService } from '../core/services/authorization/auth-routing-guard.service';

const ROUTER_CONFIG: Routes = [
    {
        path      : '', component: ManageAppComponent, canActivate: [ AuthRoutingGuardService ],
        children  : [
            {
                path: 'monitor', component: MonitorComponent, data: { title: '实时监控' },
            },
            {
                path        : 'plan',
                loadChildren: './plan/plan.module#PlanModule',
                data        : { title: '方案管理' },
            },
            {
                path        : 'baseInfo',
                loadChildren: './base/base.module#BaseInfoModule',
                data        : { title: '基础信息' },
            },
            {
                path        : 'system',
                loadChildren: './system/system.module#SystemModule',
                data        : { title: '系统设置' },
            },
            {
                path        : 'history',
                loadChildren: './history/history.module#HistoryModule',
                data        : { title: '历史方案' },
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
