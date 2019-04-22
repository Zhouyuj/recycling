import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { StatisticComponent } from './statistic.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [StatisticComponent],
  entryComponents: [StatisticComponent]
})
export class StatisticModule {}
