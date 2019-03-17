import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { WechatComponent } from './wechat.component';
import { CalendarComponent } from './manage/calendar/calendar.component';
import { TableComponent } from './manage/table/table.component';

const ROUTER_CONFIG: Routes = [
  {
    path: '',
    component: WechatComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { title: '登录' }
      },
      {
        path: 'manage/calendar',
        component: CalendarComponent
      },
      {
        path: 'manage/table',
        component: TableComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTER_CONFIG)],
  exports: [RouterModule]
})
export class WechatRoutingModule {}
