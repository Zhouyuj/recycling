import { NgModule } from '@angular/core';
import { WeighBridgesComponent } from './weigh-bridges.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [WeighBridgesComponent]
})
export class WeighBridgesModule {}
