import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { SchemeComponent } from './scheme.component';
import { SchemeRoutesComponent } from './scheme-routes/scheme-routes.component';
import { SchemeRouteDetailComponent } from './scheme-routes/scheme-route-detail.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
    ],
    declarations: [ SchemeComponent, SchemeRoutesComponent, SchemeRouteDetailComponent ],
    entryComponents: [
        SchemeComponent,
    ]
})
export class SchemeModule {
}
