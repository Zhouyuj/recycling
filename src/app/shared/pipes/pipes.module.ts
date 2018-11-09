import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistrictCodeToNamePipe } from './districts/district-code-to-name.pipe';

@NgModule({
    imports     : [
        CommonModule
    ],
    declarations: [ DistrictCodeToNamePipe ]
})
export class PipesModule {
}
