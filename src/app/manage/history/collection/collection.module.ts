import { NgModule } from '@angular/core';
import { CollectionComponent } from './collection.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [CollectionComponent],
  entryComponents: [CollectionComponent]
})
export class CollectionModule {}
