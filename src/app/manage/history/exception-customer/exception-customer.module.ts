import { NgModule } from '@angular/core';
import { ExceptionCustomerComponent } from './exception-customer.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [ExceptionCustomerComponent],
  entryComponents: [ExceptionCustomerComponent]
})
export class ExceptionCustomerModule {}
