import { Component, EventEmitter, OnInit, Input } from '@angular/core';

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
    public isSpinning = false;

    constructor(private drawerRef: NzDrawerRef<any>,
                private notificationService: NotificationService,
                private StaffInfoService: StaffInfoService) {
    }

    ngOnInit(): void {
        if (this.cache) {
            this.formData = ObjectUtils.extend(this.cache);
        } else {
            this.formData = new StaffFormModel();
            this.formData.address = [ '350000', '350600', '350603', '350603100' ];
        }
    }

    onSubmitForm(): void {
        if (!this.checkForm()) {
            return;
        }
        this.isSpinning = true;
        this.transformFormModelToRequest();
        switch (this.type) {
            case 'add':
                this.StaffInfoService.addStaff(this.staffReq).subscribe(
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
                        this.notificationService.create({
                            type   : 'error',
                            title  : '抱歉,添加失败',
                            content: err.error.message ? err.error.message : '该提醒将自动消失',
                        });
                        this.isSpinning = false;
                    },
                    () => this.isSpinning = false);
                break;
            case 'edit':
                this.StaffInfoService.updateStaff(this.cache.id, this.staffReq).subscribe(
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
                        this.notificationService.create({
                            type   : 'error',
                            title  : '抱歉,更新失败',
                            content: err.error.message ? err.error.message : '该提醒将自动消失',
                        });
                        this.isSpinning = false;
                    },
                    () => this.isSpinning = false);
                break;
        }
    }

    onClose(): void {
        this.drawerRef.close(false);
    }

    // 修改地址
    onCascaderChange(e) {
        this.formData.address = e;
    }

    transformFormModelToRequest() {
        this.staffReq = ModelConverter.formModelToStaffReq(this.formData);
    }

    checkForm() {
        if (!this.formData.name) {
            this.notificationService.create({
                type   : 'error',
                title  : '抱歉,请检查输入内容',
                content: '姓名不能为空',
            });
            return false;
        } else if (!this.formData.sex) {
            this.notificationService.create({
                type   : 'error',
                title  : '抱歉,请检查输入内容',
                content: '请选择性别',
            });
            return false;
        } else if (!this.formData.username) {
            this.notificationService.create({
                type   : 'error',
                title  : '抱歉,请检查输入内容',
                content: '工号不能为空',
            });
            return false;
        } else if (!(/^(([a-zA-Z]|\d){3,17})$/.test(this.formData.username))) {
            this.notificationService.create({
                type   : 'error',
                title  : '抱歉,请检查输入内容',
                content: '工号长度在3-18之间，只能包含字母、数字',
            });
            return false;
        } else if (this.formData.password && !(/^(([a-zA-Z]|\d){3,17})$/.test(this.formData.password))) {
            this.notificationService.create({
                type   : 'error',
                title  : '抱歉,请检查输入内容',
                content: '密码长度在3-18之间，只能包含字母、数字',
            });
            return false;
        } else if (!this.formData.password && this.type === 'add') {
            this.notificationService.create({
                type   : 'error',
                title  : '抱歉,请检查输入内容',
                content: '密码不能为空',
            });
            return false;
        } else if (!this.formData.position) {
            this.notificationService.create({
                type   : 'error',
                title  : '抱歉,请检查输入内容',
                content: '请选择岗位',
            });
            return false;
        } else if (!this.formData.entryTime) {
            this.notificationService.create({
                type   : 'error',
                title  : '抱歉,请检查输入内容',
                content: '请选择入职时间',
            });
            return false;
        } else if (!this.formData.roles.length) {
            this.notificationService.create({
                type   : 'error',
                title  : '抱歉,请检查输入内容',
                content: '请选择系统角色',
            });
            return false;
        } else if (!this.formData.landlinePhone && !this.formData.mobilePhone) {
            this.notificationService.create({
                type   : 'error',
                title  : '抱歉,请检查输入内容',
                content: '请选填固话或联系电话',
            });
            return false;
        } else {
            return true;
        }
    }
}
