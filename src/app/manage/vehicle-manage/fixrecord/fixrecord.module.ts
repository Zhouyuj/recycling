import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { FixRecordComponent } from './fixrecord.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [FixRecordComponent]
})
export class FixRecordModule {}
