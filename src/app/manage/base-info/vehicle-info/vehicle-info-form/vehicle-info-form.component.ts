import { Component, OnInit, Input } from '@angular/core';

import { NzDrawerRef } from 'ng-zorro-antd';
import { DistrictsService } from '../../../../shared/services/districts/districts.service';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { VehicleInfoService } from '../vehicle-info.service';
import { ModelConverter } from '../model-converter';
import { ObjectUtils } from '../../../../shared/utils/object-utils';
import { VehicleFormModel } from '../vehicle-form.model';
import { VehicleReq } from '../vehicle-req.model';

@Component({
    selector   : 'app-vehicle-info-form',
    templateUrl: './vehicle-info-form.component.html',
    styleUrls  : [ './vehicle-info-form.component.scss' ]
})
export class VehicleInfoFormComponent implements OnInit {

    @Input() type: string;
    @Input() success: boolean;
    @Input() cache: VehicleFormModel;
    public formData: VehicleFormModel = new VehicleFormModel();
    public vehicleReq: VehicleReq;
    public cascaderOptions: any;

    constructor(private drawerRef: NzDrawerRef<any>,
                private districtsService: DistrictsService,
                private notificationService: NotificationService,
                private vehicleInfoService: VehicleInfoService
    ) {
    }

    ngOnInit(): void {
        this.districtsService.getDistricts('350600', 1).subscribe(res => {
            this.cascaderOptions = this.convertDataToDistricts(res.data.districts);
            if (this.cache) {
                this.formData = ObjectUtils.extend(this.cache);
            } else {
                this.formData = new VehicleFormModel();
                this.formData.district = ['350603'];
            }
        });
    }

    onClose(): void {
        this.drawerRef.close(false);
    }

    onSubmitForm(): void {
        this.transformFormModelToRequest();
        console.log(this.vehicleReq);
        switch (this.type) {
            case 'add':
                this.vehicleInfoService.addVehicle(this.vehicleReq).subscribe(res => {
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
                this.vehicleInfoService.updateVehicle(this.vehicleReq, this.cache.id).subscribe(res => {
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

    transformFormModelToRequest() {
        this.vehicleReq = ModelConverter.formModelToVehicleReq(this.formData);
    }

    convertDataToDistricts(districts: any[]): any[] {
        let leafDistricts = districts.map(district => {
            return {
                value : district.code,
                label : district.name,
                isLeaf: true,
            }
        });
        return leafDistricts;
    }

}
