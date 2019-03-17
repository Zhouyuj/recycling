import { CalendarComponent } from './calendar.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [CalendarComponent],
  imports: [SharedModule]
})
export class CalendarModule {}
