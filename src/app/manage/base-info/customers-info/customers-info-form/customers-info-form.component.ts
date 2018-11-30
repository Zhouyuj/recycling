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
    public selectedCategory: 'Separate' | 'Cluster' | string;
    public formModel: FormModel = new FormModel();   // 普通收集点/子收集点
    public formModelSeparate: FormModel = new FormModel();   // 普通收集点/子收集点
    public formModelCluster: FormModel = new FormModel();   // 聚类点
    public customerReq: CustomerReq;
    public isSpinning = false;
    searchChange$ = new BehaviorSubject({});

    constructor(private drawerRef: NzDrawerRef<boolean>,
                private customersInfoService: CustomersInfoService,
                private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        if (this.cache) {
            this.selectedCategory = this.cache.category;
            this.formModelSeparate = ObjectUtils.extend(this.cache);
            this.formModelCluster = ObjectUtils.extend(this.cache);
        } else {
            this.selectedCategory = 'Separate';
            this.formModelSeparate = new FormModel();
            this.formModelSeparate.address = [ '350000', '350600', '350603' ];   // 初始化地区为龙文区
            this.formModelSeparate.category = this.selectedCategory;
            this.formModelCluster = new FormModel();
            this.formModelCluster.address = [ '350000', '350600', '350603' ];   // 初始化地区为龙文区
            this.formModelCluster.category = 'Cluster';
        }
        this.initVehicles();

    }

    /**
     * 默认龙文区下的车辆
     * @param districtCode
     */
    initVehicles() {
        const getRandomNameList = ({ districtCode, plateNumber }) => {
            districtCode = districtCode || '350603';
            return this.customersInfoService.getCustomerVehicles(new PageReq(), districtCode, 'Available', plateNumber)
                .pipe(map((res: Result<PageRes<VehicleRes[]>>) => res.data.content))
                .pipe(map((list: VehicleRes[]) => {
                    return list.map(item => `${item.plateNumber}`);
                }));
        };
        const optionList$: Observable<any> = this.searchChange$
            .asObservable()
            .pipe(debounceTime(500))
            .pipe(switchMap(getRandomNameList));
        optionList$.subscribe(data => {
            this.isVehiclesLoading = false;
            this.vehicles = data;
        });
    }

    onSearchVehicles(e) {
        this.isVehiclesLoading = true;
        console.log('search vehicles')
        let district: string;
        if (this.selectedCategory === 'Separate') {
            district = this.formModelSeparate.address[ 2 ] || '';
        } else if (this.selectedCategory === 'Cluster') {
            district = this.formModelCluster.address[ 2 ] || '';
        }
        this.searchChange$.next({ districtCode: district, plateNumber: e });
        console.log(district);
    }

    onVehicleSearchOpen(e) {
        if (e) {
            this.onSearchVehicles('');
        }
    }

    onClose(): void {
        this.drawerRef.close(false);
    }

    /**
     * 处理流程:
     * 1.判断收集点类型(category:Cluster|Separate)
     * 2.组装相应数据(body)
     * 3.调用服务（发起post请求）
     */
    onSubmitForm(): void {
        this.isSpinning = true;
        this.transformFormModelToRequest();
        switch (this.type) {
            case 'add':
                this.customersInfoService.addCustomer(this.customerReq).subscribe(
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
        switch (this.selectedCategory) {
            case 'Separate':
                this.customerReq = ModelConverter.formModelToCustomerReq(this.formModelSeparate);
                break;
            case 'Cluster':
                this.customerReq = ModelConverter.formModelToCustomerReq(this.formModelCluster);
                break;
        }
    }

    onAddressChange($e): void {
        if (this.selectedCategory === 'Separate') {
            this.formModelSeparate.address = $e;
        } else if (this.selectedCategory === 'Cluster') {
            this.formModelCluster.address = $e;
        }
    }

    onShowMap() {
        console.log('onShowMap');
    }

    /**
     * @param type: food | oil
     * @param category: Cluster | Separate
     */
    onAddDuration(type: string): void {
        console.log(type);
        switch (this.selectedCategory) {
            case 'Separate':    /* 普通点 | 子收集点 */
                const lengthS = this.formModelSeparate.duration[ type ].length || 0;
                const newIdS = this.formModelSeparate.duration[ type ][ lengthS - 1 ].idx + 1;
                this.formModelSeparate.duration[ type ].push(new DurationDetail(newIdS));
                break;
            case 'Cluster':     /* 聚类点 */
                const lengthC = this.formModelCluster.duration[ type ].length || 0;
                let newIdC;
                if (!lengthC) {
                    newIdC = 0;
                } else {
                    newIdC = this.formModelCluster.duration[ type ][ lengthC - 1 ].idx + 1;
                }
                this.formModelCluster.duration[ type ].push(new DurationDetail(newIdC));
                break;
        }
        console.log(this.formModelSeparate.duration);
        console.log(this.formModelCluster.duration);
    }

    onRemoveDuration(durationType: string, idx: number) {
        switch (this.selectedCategory) {
            case 'Separate':
                if (this.formModelSeparate.duration[ durationType ].length == 1) return;
                let durationS = this.formModelSeparate.duration[ durationType ].filter(item => item.idx !== idx);
                this.formModelSeparate.duration[ durationType ] = durationS;
                break;
            case 'Cluster':
                if (this.formModelCluster.duration[ durationType ].length == 1) return;
                let durationC = this.formModelCluster.duration[ durationType ].filter(item => item.idx !== idx);
                this.formModelCluster.duration[ durationType ] = durationC;
                break;
        }
    }

    onAddChildCollection(): void {
        let length = this.formModelSeparate.childCollections.length || 0;
        let newIdx = this.formModelSeparate.childCollections[ length - 1 ].idx + 1;
        this.formModelSeparate.childCollections.push(new ChildCollections(newIdx));
    }

    onRemoveChildCollections(idx: number) {
        if (this.formModelSeparate.childCollections.length == 1) {
            return;
        }
        let result = this.formModelSeparate.childCollections.filter(item => {
            return item.idx !== idx;
        });
        this.formModelSeparate.childCollections = result;
    }
}
