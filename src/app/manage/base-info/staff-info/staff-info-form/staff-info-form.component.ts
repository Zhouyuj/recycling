import { Component, EventEmitter, OnInit, Input } from '@angular/core';

import { DistrictsService } from '../../../../shared/services/districts/districts.service';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { StaffInfoService } from '../staff-info.service';

import { NzDrawerRef } from 'ng-zorro-antd';
import { ObjectUtils } from '../../../../shared/utils/object-utils';
import { StaffFormModel } from '../staff-form.model';
import { StaffReq } from '../staff-req.model';
import { ModelConverter } from '../model-converter';

@Component({
    selector   : 'app-staff-info-form',
    templateUrl: './staff-info-form.component.html',
    styleUrls  : [ './staff-info-form.component.scss' ]
})
export class StaffInfoFormComponent implements OnInit {

    @Input() type: string;
    @Input() success: boolean;
    @Input() cache: StaffFormModel;
    public formData: StaffFormModel;
    public staffReq: StaffReq;

    constructor(private drawerRef: NzDrawerRef<any>,
                private districtsService: DistrictsService,
                private notificationService: NotificationService,
                private StaffInfoService: StaffInfoService
    ) {
    }

    ngOnInit(): void {
        if (this.cache) {
            this.formData = ObjectUtils.extend(this.cache);
        } else {
            this.formData = new StaffFormModel();
            this.formData.address = [ '350000', '350600', '350603' ];
        }
    }

    onSubmitForm(): void {
        this.transformFormModelToRequest();
        console.log(this.staffReq);
        switch (this.type) {
            case 'add':
                this.StaffInfoService.addStaff(this.staffReq).subscribe(res => {
                    this.notificationService.create({
                        type: 'success',
                        title: '恭喜,添加成功',
                        content: '该提醒将自动消失',
                    });
                    this.success = true;
                    this.drawerRef.close(this.success);
                });
                break;
            case 'edit':
                this.StaffInfoService.updateStaff(this.cache.id, this.staffReq).subscribe(res => {
                    this.notificationService.create({
                        type: 'success',
                        title: '恭喜,更新成功',
                        content: '该提醒将自动消失',
                    });
                    this.success = true;
                    this.drawerRef.close(this.success);
                });
                break;
        }
    }

    onClose(): void {
        this.drawerRef.close(false);
    }

    transformFormModelToRequest() {
        this.staffReq = ModelConverter.formModelToStaffReq(this.formData);
    }
}
