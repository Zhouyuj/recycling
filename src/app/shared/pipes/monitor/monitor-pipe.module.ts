import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskStateToColorPipe } from './task-state-to-color.pipe';

@NgModule({
    declarations: [
        TaskStateToColorPipe,
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        TaskStateToColorPipe,
    ],
})
export class MonitorPipeModule {
}
