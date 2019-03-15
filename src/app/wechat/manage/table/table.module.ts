import { TableComponent } from './table.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [TableComponent],
  imports: [SharedModule]
})
export class TableModule {}
