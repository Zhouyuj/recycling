import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CascaderComponent } from './cascader/cascader.component';
import { HeaderComponent } from './header/header.component';
import { SelectComponent } from './select/select.component';
import { TimePickerComponent } from './time-picker/time-picker.component';

@NgModule({
    imports     : [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
    ],
    exports     : [
        BreadcrumbsComponent,
        CascaderComponent,
        HeaderComponent,
        SelectComponent,
        TimePickerComponent,
    ],
    declarations: [
        BreadcrumbsComponent,
        CascaderComponent,
        HeaderComponent,
        SelectComponent,
        TimePickerComponent,
    ],
})
export class ComponentsModule {
}
