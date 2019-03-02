import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CascaderComponent } from './cascader/cascader.component';
import { HeaderComponent } from './header/header.component';
import { SelectComponent } from './select/select.component';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { AmapComponent } from './amap/amap.component';
import { AmarkerComponent } from './amap/amarker.component';
import { AdrivingComponent } from './amap/adriving.component';
import { ApolylineComponent } from './amap/apolyline.component';

@NgModule({
    imports     : [
        CommonModule,
        RouterModule,
        FormsModule,
        NgZorroAntdModule,
    ],
    exports     : [
        BreadcrumbsComponent,
        CascaderComponent,
        HeaderComponent,
        SelectComponent,
        TimePickerComponent,
        AmapComponent,
        AmarkerComponent,
        AdrivingComponent,
        ApolylineComponent,
    ],
    declarations: [
        BreadcrumbsComponent,
        CascaderComponent,
        HeaderComponent,
        SelectComponent,
        TimePickerComponent,
        AmapComponent,
        AmarkerComponent,
        AdrivingComponent,
        ApolylineComponent,
    ],
})
export class ComponentsModule {
}
