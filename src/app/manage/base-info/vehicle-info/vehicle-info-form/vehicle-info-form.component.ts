import { Component, OnInit } from '@angular/core';

import { NzDrawerRef } from 'ng-zorro-antd';
import { MessageService } from '../../../../shared/services/message/message.service';
import { NotificationService } from '../../../../shared/services/notification/notification.service';

@Component({
    selector   : 'app-vehicle-info-form',
    templateUrl: './vehicle-info-form.component.html',
    styleUrls  : [ './vehicle-info-form.component.scss' ]
})
export class VehicleInfoFormComponent implements OnInit {

    public formData: any = {
        licensePlate   : null,
        vehicleFrame   : null,
        engineNumber   : null,
        vehicleBoxId   : null,
        purchaseDate   : new Date(),
        remark         : null,
        planStartTime  : null,
        planEndTime    : null,
        vehicleType    : null,
        vehicleLocation: null,
        isTestVehicle  : null,
    };

    constructor(private drawerRef: NzDrawerRef<any>,
                private messageService: MessageService,
                private notificationService: NotificationService
    ) {
    }

    ngOnInit(): void {
    }

    onPurchaseDateChange($e): void {
        console.log($e);
    }

    onClose(): void {
        this.drawerRef.close();
    }

    onSubmitForm(): void {
        console.log('submit');
        console.log(this.formData);
    }


}
