import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableRowSelectedDirective } from './table-row-selected.directive';

@NgModule({
    imports     : [
        CommonModule
    ],
    exports     : [
        TableRowSelectedDirective,
    ],
    declarations: [
        TableRowSelectedDirective,
    ],
})
export class DirectivesModule {
}
