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
        //this.initForm();
        this.initVehicles();
    }

    initForm() {
        if (this.cache) {
            this.selectedCategory = this.cache.category;
            this.formModelSeparate = ObjectUtils.extend(this.cache);
            this.formModelCluster = ObjectUtils.extend(this.cache);
        } else {
            this.selectedCategory = 'Separate';

            this.formModelSeparate = new FormModel();
            this.formModelSeparate.address = [ '350000', '350600', '350603', '350603100' ];   // 初始化地区为龙文区
            this.formModelSeparate.category = this.selectedCategory;

            this.formModelCluster = new FormModel();
            this.formModelCluster.address = [ '350000', '350600', '350603', '350603100' ];   // 初始化地区为龙文区
            this.formModelCluster.category = 'Cluster';
        }
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
            this.initForm();
        });
    }

    onSearchVehicles(e) {
        this.isVehiclesLoading = true;
        let district: string;
        if (this.selectedCategory === 'Separate') {
            district = this.formModelSeparate.address[ 2 ] || '';
        } else if (this.selectedCategory === 'Cluster') {
            district = this.formModelCluster.address[ 2 ] || '';
        }
        this.searchChange$.next({ districtCode: district, plateNumber: e });
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
        if (!this.checkForm()) {
            return;
        }
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
                            content: err.error.message ? err.error.message : '该提醒将自动消失',
                        });
                        this.isSpinning = false;
                    },
                    () => this.isSpinning = false
                );
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
                            content: err.error.message ? err.error.message : '该提醒将自动消失',
                        });
                        this.isSpinning = false;
                    },
                    () => this.isSpinning = false
                );
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
        switch (this.selectedCategory) {
            case 'Separate':    /* 普通点 | 子收集点 */
                const lengthS = this.formModelSeparate.duration[ type ] ? this.formModelSeparate.duration[ type ].length : 0;
                const newIdS = !lengthS ? 0 : this.formModelSeparate.duration[ type ][ lengthS - 1 ].idx + 1;
                this.formModelSeparate.duration[ type ].push(new DurationDetail(newIdS));
                break;
            case 'Cluster':     /* 聚类点 */
                const lengthC = this.formModelCluster.duration[ type ] ? this.formModelCluster.duration[ type ].length : 0;
                let newIdC = !lengthC ? 0 : this.formModelCluster.duration[ type ][ lengthC - 1 ].idx + 1;
                this.formModelCluster.duration[ type ].push(new DurationDetail(newIdC));
                break;
        }
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
        let length = this.formModelCluster.childCollections.length || 0;
        let newIdx = !length ? 0 : this.formModelCluster.childCollections[ length - 1 ].idx + 1;
        this.formModelCluster.childCollections.push(new ChildCollections(newIdx));
    }

    onRemoveChildCollections(idx: number) {
        if (this.formModelCluster.childCollections.length == 1) {
            return;
        }
        let result = this.formModelCluster.childCollections.filter(item => {
            return item.idx !== idx;
        });
        this.formModelCluster.childCollections = result;
    }

    checkForm(): boolean {
        switch (this.selectedCategory) {
            case 'Separate':
                if (!this.formModelSeparate.collectionName) {
                    this.notificationService.create({
                        type   : 'error',
                        title  : '抱歉,请检查输入内容',
                        content: '名称不能为空',
                    });
                    return false;
                } else if (!this.formModelSeparate.collectionType) {
                    this.notificationService.create({
                        type   : 'error',
                        title  : '抱歉,请检查输入内容',
                        content: '请选择单位类型',
                    });
                    return false;
                } else if (!this.formModelSeparate.contactPersonName) {
                    this.notificationService.create({
                        type   : 'error',
                        title  : '抱歉,请检查输入内容',
                        content: '请输入联系人',
                    });
                    return false;
                } else if (!this.formModelSeparate.mobile && !this.formModelSeparate.tel) {
                    this.notificationService.create({
                        type   : 'error',
                        title  : '抱歉,请检查输入内容',
                        content: '请输入移动电话或固定电话',
                    });
                    return false;
                } else if (parseInt(this.formModelSeparate.hasKey) !== 0 && parseInt(this.formModelSeparate.hasKey) !== 1) {
                    this.notificationService.create({
                        type   : 'error',
                        title  : '抱歉,请检查输入内容',
                        content: '请选择是否自带钥匙',
                    });
                    return false;
                } else if (this.formModelSeparate.level && !this.formModelSeparate.duration.food.length && !this.formModelSeparate.duration.oil.length) {
                    this.notificationService.create({
                        type   : 'error',
                        title  : '抱歉,请检查输入内容',
                        content: '普通收集点请选择至少一个收运时间段',
                    });
                    return false;
                } else if (this.formModelSeparate.duration.food.length) {
                    let result = null;
                    this.formModelSeparate.duration.food.forEach((item: DurationDetail) => {
                        // 判断是否有未填的必填数据
                        let needComplete = !(!!item.dateType && !!item.startTime && !!item.endTime && !!item.priorityType);
                        if (needComplete) {
                            this.notificationService.create({
                                type   : 'error',
                                title  : '抱歉,请检查输入内容',
                                content: '请检查收运时间段必填项的信息是否完善:【餐厨垃圾】时间类型/时间区间/重要等级',
                            });
                            result = false;
                            return; // 停止循环
                        } else {
                            result = true;
                        }
                    });
                    return result;
                } else if (this.formModelSeparate.duration.oil.length) {
                    let result = null;
                    this.formModelSeparate.duration.oil.forEach((item: DurationDetail) => {
                        // 判断是否有未填的必填数据
                        let needComplete = !(!!item.dateType && !!item.startTime && !!item.endTime && !!item.priorityType);
                        if (needComplete) {
                            this.notificationService.create({
                                type   : 'error',
                                title  : '抱歉,请检查输入内容',
                                content: '请检查收运时间段必填项的信息是否完善:【油脂垃圾】时间类型/时间区间/重要等级',
                            });
                            result = false;
                            return; // 停止循环
                        } else {
                            result = true;
                        }
                    });
                    return result;
                }
                break;
            case 'Cluster':
                if (!this.formModelCluster.collectionName) {
                    this.notificationService.create({
                        type   : 'error',
                        title  : '抱歉,请检查输入内容',
                        content: '名称不能为空',
                    });
                    return false;
                } else if (!this.formModelCluster.collectionType) {
                    this.notificationService.create({
                        type   : 'error',
                        title  : '抱歉,请检查输入内容',
                        content: '请选择单位类型',
                    });
                    return false;
                } else if (!this.formModelCluster.duration.food.length && !this.formModelCluster.duration.oil.length) {
                    this.notificationService.create({
                        type   : 'error',
                        title  : '抱歉,请检查输入内容',
                        content: '聚类点请选择至少一个收运时间段',
                    });
                    return false;
                } else if (this.formModelCluster.duration.food.length) {
                    let result = null;
                    this.formModelCluster.duration.food.forEach((item: DurationDetail) => {
                        // 判断是否有未填的必填数据
                        let needComplete = !(!!item.dateType && !!item.startTime && !!item.endTime && !!item.priorityType);
                        if (needComplete) {
                            this.notificationService.create({
                                type   : 'error',
                                title  : '抱歉,请检查输入内容',
                                content: '请检查收运时间段必填项的信息是否完善:【餐厨垃圾】时间类型/时间区间/重要等级',
                            });
                            result = false;
                            return; // 停止循环
                        } else {
                            result = true;
                        }
                    });
                    return result;
                } else if (this.formModelCluster.duration.oil.length) {
                    let result = null;
                    this.formModelCluster.duration.oil.forEach((item: DurationDetail) => {
                        // 判断是否有未填的必填数据
                        let needComplete = !(!!item.dateType && !!item.startTime && !!item.endTime && !!item.priorityType);
                        if (needComplete) {
                            this.notificationService.create({
                                type   : 'error',
                                title  : '抱歉,请检查输入内容',
                                content: '请检查收运时间段必填项的信息是否完善:【油脂垃圾】时间类型/时间区间/重要等级',
                            });
                            result = false;
                            return; // 停止循环
                        } else {
                            result = true;
                        }
                    });
                    return result;
                }
                break;
        }
    }
}
