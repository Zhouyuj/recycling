import { Component, OnInit, Input } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { VehicleManageService } from '../../vehicle-manage.service';
import { VehicleInfoService } from '../../../base/vehicle-info/vehicle-info.service';
import { ObjectUtils } from '../../../../shared/utils/object-utils';
import { UpkeepRecordFormModel } from '../../model/upkeep-record-form.model';
import { UpkeepRecordReq } from '../../model/upkeep-record-req.model';
import { VerifyUtil } from '../../../../shared/utils/verify-utils';
import { ModelConverter } from '../model-converter';
import { PageReq } from 'src/app/shared/models/page/page-req.model';

@Component({
    selector: 'app-upkeep-record-info-form',
    templateUrl: './upkeep-record-info-form.component.html',
    styleUrls: ['./upkeep-record-info-form.component.scss']
})
export class UpkeepRecordInfoFormComponent implements OnInit{

    @Input() type: string;
    @Input() success: boolean;
    @Input() cache: UpkeepRecordFormModel;
    public formData: UpkeepRecordFormModel = new UpkeepRecordFormModel();
    public upkeepRecordReq: UpkeepRecordReq;
    public isSpinning = false;
    public vehicleList: any[];
    public optionsOfVehicle: any[];
    
    constructor(
        private drawerRef: NzDrawerRef<any>,
        private notificationService: NotificationService,
        private vehicleManageService: VehicleManageService,
        private vehicleInfoService: VehicleInfoService
    ){
        this.vehicleList = [];
        this.optionsOfVehicle = [];
    }

    ngOnInit(): void {
        if (this.cache) {
            this.formData = ObjectUtils.cloneDeep(this.cache);
        } else {
            this.formData = new UpkeepRecordFormModel();
        }

        let pageReq = new PageReq();
        pageReq.size = 3000;
        this.vehicleInfoService.getVehicleList(pageReq).subscribe(
            res => {
                if (res.data.content) {
                    this.vehicleList = res.data.content;
                    this.optionsOfVehicle = res.data.content;
                }
            },
            err => {
                this.vehicleList = [];
                this.optionsOfVehicle = [];
            }
        );
    }

    onClose(): void {
        this.drawerRef.close(false);
    }

    onPlanUpkeepTime(e) {
        this.formData.planUpkeepDate = e;
    }

    onUpkeepTime(e) {
        this.formData.upkeepDate = e;
    }

    onSubmitForm(): void {
        if (!this.checkForm()) {
            return;
        }
        this.transformFormModelToRequest();
        switch (this.type) {
            case 'add': 
                this.vehicleManageService.addUpkeepRecord(this.upkeepRecordReq).subscribe(
                    res => {
                        this.notificationService.create({
                            type: 'success',
                            title: '恭喜，添加成功',
                            content: '该提醒将自动消失'
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
                this.vehicleManageService.updateUpkeepRecord(this.upkeepRecordReq, this.upkeepRecordReq.id).subscribe(
                    res => {
                        this.notificationService.create({
                            type: 'success',
                            title: '恭喜，更新成功',
                            content: '该提醒将自动消失'
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

    checkForm() {        
        if (!this.formData.upkeepDate) {
            this.notificationService.create({
                type: 'error',
                title: '抱歉，添加失败',
                content: '保养日期不能为空'
            });
            return false;
        } else if (!this.formData.planUpkeepDate) {
            this.notificationService.create({
                type: 'error',
                title: '抱歉，添加失败',
                content: '计划保养日期不能为空'
            });
            return false;
        } else if (!this.formData.vehicle) {
            this.notificationService.create({
                type: 'error',
                title: '抱歉，添加失败',
                content: '车牌号不能为空'
            });
            return false;
        } else if (!this.formData.upkeepMileage) {
            this.notificationService.create({
                type: 'error',
                title: '抱歉，添加失败',
                content: '里程不能为空'
            });
            return false;
        } else if (!this.formData.upkeepTimeCost) {
            this.notificationService.create({
                type: 'error',
                title: '抱歉，添加失败',
                content: '保养用时不能为空'
            });
            return false;
        } else if (!this.formData.upkeepPerson) {
            this.notificationService.create({
                type: 'error',
                title: '抱歉，添加失败',
                content: '保养人不能为空'
            });
            return false;
        } else if (!this.formData.upkeepCost) {
            this.notificationService.create({
                type: 'error',
                title: '抱歉，添加失败',
                content: '保养费用不能为空'
            });
            return false;
        } else if (!this.formData.chargePerson) {
            this.notificationService.create({
                type: 'error',
                title: '抱歉，添加失败',
                content: '负责人不能为空'
            });
            return false;
        } else if (!this.formData.upkeepCompany) {
            this.notificationService.create({
                type: 'error',
                title: '抱歉，添加失败',
                content: '保养单位不能为空'
            });
            return false;
        } else if (!this.formData.acceptancePerson) {
            this.notificationService.create({
                type: 'error',
                title: '抱歉，添加失败',
                content: '验收人不能为空'
            });
            return false;
        } else if (!this.formData.upkeepContent) {
            this.notificationService.create({
                type: 'error',
                title: '抱歉，添加失败',
                content: '保养内容不能为空'
            });
            return false;
        } else {
            return true;
        }
    }

    transformFormModelToRequest() {
        this.upkeepRecordReq = ModelConverter.formModelToUpkeepRecordReq(this.formData);
    }
    onSearchVehicle(value: string):void {
        let subVehicles = [];
        this.vehicleList.forEach(vehicle => {
          if(vehicle.plateNumber.includes(value)) {
            subVehicles.push(vehicle);
          }
        });
        this.optionsOfVehicle = subVehicles;
    }
}