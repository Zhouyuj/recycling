import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    TaskStateToChinesePipe,
    PlanStateToChinesePipe,
    PlanCategoryToChinesePipe
} from './plan.pipe';

@NgModule({
    imports     : [
        CommonModule
    ],
    exports     : [
        TaskStateToChinesePipe,
        PlanStateToChinesePipe,
        PlanCategoryToChinesePipe,
    ],
    declarations: [
        TaskStateToChinesePipe,
        PlanStateToChinesePipe,
        PlanCategoryToChinesePipe,
    ],
})
export class PlanPipeModule {
}
