import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapService } from './map/map.service';
import { MessageService } from './message/message.service';
import { NotificationService } from './notification/notification.service';
import { DistrictsService } from './districts/districts.service';
import { ModalService } from './modal/modal.service';

@NgModule({
    imports     : [
        CommonModule
    ],
    declarations: [],
    providers   : [
        MapService,
        MessageService,
        NotificationService,
        DistrictsService,
        ModalService,
    ],
})
export class ServicesModule {
}
