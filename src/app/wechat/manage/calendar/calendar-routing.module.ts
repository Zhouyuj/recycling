import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar.component';

const ROUTER_CONFIG: Routes = [
  {
    path: '',
    component: CalendarComponent,
    data: { title: '商户平台' }
  }
];
@NgModule({
  imports: [RouterModule.forChild(ROUTER_CONFIG)],
  exports: [RouterModule]
})
export class CalendarRoutingModule {}
