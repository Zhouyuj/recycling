import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { TableComponent } from './table/table.component';

const ROUTER_CONFIG: Routes = [
  {
    path: 'calendar',
    component: CalendarComponent,
    data: { title: '商户平台' }
  },
  {
    path: 'table',
    component: TableComponent,
    data: { title: '商户平台' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTER_CONFIG)],
  exports: [RouterModule]
})
export class ManageRoutingModule {}
