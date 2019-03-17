import { ManageService } from './manage.service';
import { ManageComponent } from './manage.component';
import { NgModule } from '@angular/core';
import { ManageRoutingModule } from './manage-routing.module';
import { CalendarModule } from './calendar/calendar.module';
import { TableModule } from './table/table.module';

@NgModule({
  providers: [ManageService],
  declarations: [ManageComponent],
  imports: [ManageRoutingModule, CalendarModule, TableModule]
})
export class ManageModule {}
