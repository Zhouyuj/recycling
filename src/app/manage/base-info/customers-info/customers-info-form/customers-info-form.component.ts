import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

import { NzDrawerRef } from 'ng-zorro-antd';

import { CustomersInfoService } from '../customers-info.service';
import { NotificationService } from '../../../../shared/services/notification/notification.service';

import { CustomerReq } from '../customer-req.model';
import { CustomerRes } from '../customer-res.model';
import { FormModel, DurationDetail, ChildCollections } from './../form.model';
import { ModelConverter } from '../model-converter';
import { ObjectUtils } from '../../../../shared/utils/object-utils';
import { PageRes } from '../../../../shared/models/page/page-res.model';
import { PageReq } from '../../../../shared/models/page/page-req.model';
import { Result } from '../../../../shared/models/response/result.model';
import { VehicleRes } from '../../vehicle-info/vehicle-res.model';
import { VerifyUtil } from '../../../../shared/utils/verify-utils';

@Component({
    selector   : 'app-customers-info-form',
    templateUrl: './customers-info-form.component.html',
    styleUrls  : [ './customers-info-form.component.scss' ]
})
export class CustomersInfoFormComponent implements OnInit {

    @Input() type: string;
    @Input() success: boolean;
    @Input() cache: FormModel;
    @Input() countyNames: [{ code: string, name: string }];
    public vehicles: string[];
    public isVehiclesLoading = false;
    public vehicleSearchChange$ = new BehaviorSubject('');
    public formData: FormModel = new FormModel();
    public customerReq: CustomerReq;
    public isSpinning = false;

    constructor(private drawerRef: NzDrawerRef<boolean>,
                private customersInfoService: CustomersInfoService,
                private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        if (this.cache) {
            this.formData = ObjectUtils.extend(this.cache);
        } else {
            this.formData = new FormModel();
            this.formData.address = [ '350000', '350600', '350603' ];
        }
    }

    getVehicles(plateNum: string, countyName: string) {
        return this.customersInfoService.getCustomerVehicles(new PageReq(), countyName, 'Available', plateNum)
            .pipe(
                map((res: Result<PageRes<VehicleRes[]>>) => res.data.content),
                map((res: VehicleRes[]) => res.map((vehicle: VehicleRes) => vehicle.plateNumber))
            )
            .subscribe((res: string[]) => {
                this.vehicles = res;
                this.isVehiclesLoading = false;
            });
    }

    getSelectedCountyName(code: string): string {
        let result = this.countyNames.filter(item => item.code == code);
        return result.length > 0 ? result[ 0 ].name : '';
    }

    onSearchVehicles(e) {
        if (e) {
            let countyCode: string = this.formData.address[ 2 ],
                countyName: string = this.getSelectedCountyName(countyCode);
            this.isVehiclesLoading = true;
            this.getVehicles(e, countyName);
        }
    }

    onClose(): void {
        this.drawerRef.close(false);
    }

    onSubmitForm(): void {
        this.isSpinning = true;
        this.transformFormModelToRequest();
        switch (this.type) {
            case 'add':
                this.customersInfoService.addCustomer(this.customerReq, this.cache.id).subscribe(
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
                            content: err.message ? err.message : '该提醒将自动消失',
                        });
                        this.isSpinning = false;
                    },
                    () => this.isSpinning = false);
                break;
            case 'edit':
                this.customersInfoService.updateCustomer(this.customerReq, this.cache.id).subscribe(
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
                            content: err.message ? err.message : '该提醒将自动消失',
                        });
                        this.isSpinning = false;
                    },
                    () => this.isSpinning = false);
                break;
        }
    }

    transformFormModelToRequest() {
        this.customerReq = ModelConverter.formModelToCustomerReq(this.formData);
    }

    onAddressChange($e): void {
        this.formData.address = $e; // TODO
    }

    onShowMap() {
        console.log('onShowMap');
    }

    onAddDuration(type: string): void {
        let length = this.formData.duration[ type ].length || 0;
        let newId = this.formData.duration[ type ][ length - 1 ].id + 1;
        this.formData.duration[ type ].push(new DurationDetail(newId));
    }

    onRemoveDuration(type: string, id: number) {
        if (this.formData.duration[ type ].length == 1) {
            return;
        }
        let result = this.formData.duration[ type ].filter(item => {
            return item.id !== id;
        });
        this.formData.duration[ type ] = result;
    }

    onAddChildCollection(): void {
        let length = this.formData.childCollections.length || 0;
        let newId = this.formData.childCollections[ length - 1 ].id + 1;
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
}
