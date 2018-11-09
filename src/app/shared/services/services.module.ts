import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapService } from './map/map.service';
import { MessageService } from './message/message.service';
import { NotificationService } from './notification/notification.service';
import { DistrictsService } from './districts/districts.service';

@NgModule({
    imports     : [
        CommonModule
    ],
    declarations: [],
    providers   : [
        MapService,
        MessageService,
        NotificationService,
        DistrictsService
    ],
})
export class ServicesModule {
}
