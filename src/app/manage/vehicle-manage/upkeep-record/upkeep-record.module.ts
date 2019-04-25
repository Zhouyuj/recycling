import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { UpkeepRecordComponent } from './upkeep-record.component';
import { UpkeepRecordInfoFormComponent } from './upkeep-record-info-form/upkeep-record-info-form.component';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [UpkeepRecordComponent, UpkeepRecordInfoFormComponent],
    entryComponents: [
        UpkeepRecordInfoFormComponent
    ]
})
export class UpkeepRecordModule {}