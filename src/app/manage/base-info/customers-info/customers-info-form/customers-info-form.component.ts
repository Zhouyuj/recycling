import { Component, OnInit, Input } from '@angular/core';

import { NzDrawerRef } from 'ng-zorro-antd';

import { CustomersInfoService } from '../customers-info.service';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { CustomerReq } from '../customer-req.model';
import { CustomerRes } from '../customer-res.model';
import { ChildCollections } from './form.model';
import { FormModel, DurationDetail } from './form.model';
import { ModelConverter } from '../model-converter';
import { ObjectUtils } from '../../../../shared/utils/object-utils';
import {VerifyUtil} from '../../../../shared/utils/verify-utils';

@Component({
    selector   : 'app-customers-info-form',
    templateUrl: './customers-info-form.component.html',
    styleUrls  : [ './customers-info-form.component.scss' ]
})
export class CustomersInfoFormComponent implements OnInit  {

    @Input() type: string;
    @Input() success: boolean;
    @Input() cache: FormModel;
    public formData: FormModel = new FormModel();
    public customerReq: CustomerReq;

    constructor(private drawerRef: NzDrawerRef<boolean>,
                private customersInfoService: CustomersInfoService,
                private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        if (this.cache) {
            console.log(this.cache);
            this.formData = ObjectUtils.extend(this.cache);
            console.log(this.formData);
        } else {
            this.formData = new FormModel();
            this.formData.address = ['350000', '350600', '350603'];
        }
    }

    onClose(): void {
        this.drawerRef.close(false);
    }

    onSubmitForm(): void {
        this.transformFormModelToRequest();
        switch (this.type) {
            case 'add':
                this.customersInfoService.addCustomer(this.customerReq, this.cache.id).subscribe(res => {
                    this.notificationService.create({
                        type: 'success',
                        title: '',
                        content: '恭喜,添加成功',
                    });
                    this.success = true;
                    this.drawerRef.close(this.success);
                });
                break;
            case 'edit':
                this.customersInfoService.updateCustomer(this.customerReq, this.cache.id).subscribe(res => {
                    this.notificationService.create({
                        type: 'success',
                        title: '',
                        content: '恭喜,更新成功',
                    });
                    this.success = true;
                    this.drawerRef.close(this.success);
                });
                break;
        }
    }

    transformFormModelToRequest() {
        //this.customerReq = new CustomerReq(this.formData);
        this.customerReq = ModelConverter.formModelToCustomerReq(this.formData);
        console.log(this.customerReq);
    }

    onAddressChange($e): void {
        this.formData.address = $e; // TODO
    }

    onShowMap() {
        console.log('onShowMap');
    }

    onAddDuration(type: string): void {
        let length = this.formData.duration[type].length || 0;
        let newId = this.formData.duration[type][length - 1].id + 1;
        this.formData.duration[ type ].push(new DurationDetail(newId));
    }

    onRemoveDuration(type: string, id: number) {
        if (this.formData.duration[type].length == 1) {
            return;
        }
        let result = this.formData.duration[type].filter(item => {
            return item.id !== id;
        });
        this.formData.duration[type] = result;
    }

    onAddChildCollection(): void {
        let length = this.formData.childCollections.length || 0;
        let newId = this.formData.childCollections[length - 1].id + 1;
        this.formData.childCollections.push(new ChildCollections(newId));
    }

    onRemoveChildCollections(id: number) {
        if (this.formData.childCollections.length == 1) {
            return;
        }
        let result = this.formData.childCollections.filter(item => {
            return item.id !== id;
        });
        this.formData.childCollections = result;
    }

    checkFormNull() {
        // 必填:名称name,类别collectionType,地址address,联系人contactName,联系电话tel,移动电话mobile,
        //      置桶数dustbinCounts,收运时是否自带钥匙hasKey,(时间类型,时间区间,重要等级,指定车辆;Duration)
        for(let k in this.formData) {
            // TODO switch
            VerifyUtil.isEmpty(this.formData[k])
        }
    }
}
