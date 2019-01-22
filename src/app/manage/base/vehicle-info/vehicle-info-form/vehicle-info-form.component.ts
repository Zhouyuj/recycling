import { Component, OnInit, Input } from '@angular/core';

import { NzDrawerRef } from 'ng-zorro-antd';
import { DistrictsService } from '../../../../shared/services/districts/districts.service';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { VehicleInfoService } from '../vehicle-info.service';
import { ModelConverter } from '../model-converter';
import { ObjectUtils } from '../../../../shared/utils/object-utils';
import { VehicleFormModel } from '../vehicle-form.model';
import { VehicleReq } from '../vehicle-req.model';
import { VerifyUtil } from '../../../../shared/utils/verify-utils';

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
    public isSpinning = false;

    constructor(private drawerRef: NzDrawerRef<any>,
                private districtsService: DistrictsService,
                private notificationService: NotificationService,
                private vehicleInfoService: VehicleInfoService) {
    }

    ngOnInit(): void {
        this.districtsService.getDistricts('350600', 1).subscribe(res => {
            this.cascaderOptions = this.convertDataToDistricts(res.data.districts);
            if (this.cache) {
                this.formData = ObjectUtils.cloneDeep(this.cache);
            } else {
                this.formData = new VehicleFormModel();
                //this.formData.district = [ '350603' ];
            }
        });
    }

    onClose(): void {
        this.drawerRef.close(false);
    }

    /**
     * @param e
     */
    onPlanBackTimeChange(e) {
        this.formData.planBackTime = e;
    }

    /**
     *
     */
    onPlanDepartureTimeChange(e) {
        this.formData.planDepartureTime = e;
        console.log(this.formData.planDepartureTime);
    }

    onSubmitForm(): void {
        if (!this.checkForm()) {
            return;
        }
        this.transformFormModelToRequest();
        switch (this.type) {
            case 'add':
                this.vehicleInfoService.addVehicle(this.vehicleReq).subscribe(
                    res => {
                        this.notificationService.create({
                            type   : 'success',
                            title  : '恭喜,添加成功',
                            content: '该提醒将自动消失',
                        });
                        this.success = true;
                        this.drawerRef.close(this.success);
                    },
                    err => {
                        this.isSpinning = false;
                    },
                    () => this.isSpinning = false
                );
                break;
            case 'edit':
                this.vehicleInfoService.updateVehicle(this.vehicleReq, this.cache.id).subscribe(
                    res => {
                        this.notificationService.create({
                            type   : 'success',
                            title  : '恭喜,更新成功',
                            content: '该提醒将自动消失',
                        });
                        this.success = true;
                        this.drawerRef.close(this.success);
                    },
                    err => {
                        this.isSpinning = false;
                    },
                    () => this.isSpinning = false
                );
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

    checkForm() {
        if (!this.formData.plateNumber) {
            this.notificationService.create({
                type   : 'error',
                title  : '抱歉,添加失败',
                content: '车牌号不能为空',
            });
            return false;
        } else if (!this.formData.buyDate) {
            this.notificationService.create({
                type   : 'error',
                title  : '抱歉,请检查内容',
                content: '购买时间不能为空',
            });
            return false;
        } else if (!this.formData.planDepartureTime) {
            this.notificationService.create({
                type   : 'error',
                title  : '抱歉,请检查内容',
                content: '出车时间不能为空',
            });
            return false;
        } else if (!this.formData.planBackTime) {
            this.notificationService.create({
                type   : 'error',
                title  : '抱歉,请检查内容',
                content: '回厂时间不能为空',
            });
            return false;
        } else if (parseInt(this.formData.planDepartureTime[0]) > parseInt(this.formData.planBackTime[0])
            || parseInt(this.formData.planDepartureTime[0]) === parseInt(this.formData.planBackTime[0])
            && parseInt(this.formData.planDepartureTime[1]) > parseInt(this.formData.planBackTime[1])) {
            this.notificationService.create({
                type   : 'error',
                title  : '抱歉,请检查内容',
                content: '回厂时间不能早于出车时间',
            });
            return false;
        } else if (!this.formData.type) {
            this.notificationService.create({
                type   : 'error',
                title  : '抱歉,请检查内容',
                content: '车型不能为空',
            });
            return false;
        }/* else if (!this.formData.district) {
            this.notificationService.create({
                type   : 'error',
                title  : '抱歉,请检查内容',
                content: '所属区域不能为空',
            });
            return false;
        }*/ else {
            return true;
        }
    }

}
