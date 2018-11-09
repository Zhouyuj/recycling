import { Component, OnInit, Input } from '@angular/core';

import { NzDrawerRef } from 'ng-zorro-antd';

import { FormModel, DurationDetail } from './form.model';
import { CustomerReq } from '../customer-req.model';
import { CustomerRes } from '../customer-res.model';
import { ChildCollections } from './form.model';
import { CustomersInfoService } from '../customers-info.service';
import { MessageService } from '../../../../shared/services/message/message.service';
import {ModelConverter} from '../model-converter';
import {ObjectUtils} from '../../../../shared/utils/object-utils';

@Component({
    selector   : 'app-customers-info-form',
    templateUrl: './customers-info-form.component.html',
    styleUrls  : [ './customers-info-form.component.scss' ]
})
export class CustomersInfoFormComponent implements OnInit {

    @Input() success: boolean;
    @Input() cache: FormModel;
    public formData: FormModel = new FormModel();
    public customerReq: CustomerReq;

    constructor(private drawerRef: NzDrawerRef<boolean>,
                private customersInfoService: CustomersInfoService,
                private messageService: MessageService) {
    }

    ngOnInit(): void {
        /*if (this.cache) {
            this.formData = this.cache;
        }
        console.log('form opened!!', this.formData);
        if (!this.formData.address || this.formData.address.length <= 0) {
            this.formData.address = ['350000', '350600', '350603']; // 默认龙文区
        }*/
        // 该测试说明脏检测成功
        /*let temp = Date.now(), oddEven = 0;
        setInterval(() => {
            temp -= 1000 * 3600;
            oddEven = parseInt(Math.random()*10)%2 as number;
            this.formData.duration.food[0].startTime = new Date(temp);
            this.formData.duration.food[0].workingDay = ['Working', 'Holiday'][oddEven];
            console.log(temp);
            console.log(this.formData.duration.food[0].startTime, this.formData.duration.food[0].workingDay);
        }, 3000);*/
        console.log('init start', this.formData);
        setTimeout(() => {
            console.log('init end');
            if (this.cache) {
                this.formData = ObjectUtils.deepClone(this.cache);
            }
            console.log('form opened!!', this.formData);
            if (!this.formData.address || this.formData.address.length <= 0) {
                this.formData.address = ['350000', '350600', '350603']; // 默认龙文区
            }
        }, 2000);
    }

    onClose(): void {
        //this.drawerRef.close(false);
        console.log(this.formData);
        this.transformFormModelToRequest();
    }

    onSubmitForm(): void {
        console.log('submit');
        console.log(this.formData);
        this.transformFormModelToRequest();
        /*this.customersInfoService.addCustomer(this.customerReq).subscribe(res => {
            this.messageService.create({
                type: 'success',
                content: '恭喜,您已添加成功',
            });
            this.success = true;
            this.drawerRef.close(this.success);
        });*/
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

    transformFormModelToRequest() {
        this.customerReq = new CustomerReq(this.formData);
        console.log(this.customerReq);
    }

    onTimeChange(e: Date) {
        ModelConverter.convertDateToSecond(e);
    }

}
