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
import { ListModel } from '../list.model';

@Component({
    selector   : 'app-customers-info-form',
    templateUrl: './customers-info-form.component.html',
    styleUrls  : [ './customers-info-form.component.scss' ]
})
export class CustomersInfoFormComponent implements OnInit {

    @Input() type: string;
    @Input() success: boolean;
    @Input() cache: FormModel;
    @Input() parentCache: ListModel;    // 只用于在提交表单时,判断是否加上（若存在）其聚类点的前缀
    public oldClusterName: string;  // 当选择的为聚类点时,该值为初始化表单的聚类点名称,在修改聚类点时为子点添加前缀使用到
    public vehicles: string[];
    public isVehiclesLoading = false;
    public selectedCategory: 'Separate' | 'Cluster' | string;
    public formModelSeparate: FormModel = new FormModel();   // 普通收运单位/子收运单位
    public formModelCluster: FormModel = new FormModel();   // 聚类点
    public customerReq: CustomerReq;
    public isSpinning = false;
    searchChange$ = new BehaviorSubject({});    // 选择车辆的函数防抖

    constructor(private drawerRef: NzDrawerRef<boolean>,
                private customersInfoService: CustomersInfoService,
                private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        if (this.cache) {
            this.oldClusterName = this.cache.collectionName;
            this.selectedCategory = this.cache.category;
            this.formModelSeparate = ObjectUtils.cloneDeep(this.cache);
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
        this.initVehicles();
    }

    /**
     * 默认龙文区下的车辆
     * @param districtCode
     */
    initVehicles() {
        const getRandomNameList = ({ districtCode, plateNumber }) => {
            // 若需要根据地区来选择车辆,只要打开一下这行代码,使districtCode存在 区/市 的code即可
            //districtCode = districtCode || '350603';
            // 若需要根据地区选择车辆,删除一下行代码
            districtCode = '';
            return this.customersInfoService.getCustomerVehicles(new PageReq(1, 20), districtCode, 'Available', plateNumber)
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
     * 1.判断收运单位类型(category:Cluster|Separate)
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
                this.customerReq = ModelConverter.formModelToCustomerReq(this.formModelSeparate, this.parentCache && this.parentCache.name || '');
                break;
            case 'Cluster':
                this.customerReq = ModelConverter.formModelToCustomerReq(this.formModelCluster, '', this.oldClusterName);
                break;
        }
    }

    /**
     * 地址选择修改后,详细地址和选择车辆 清空,需要重新选择.
     * 2018.12.20 需求改为 不需要清空:目前漳州车辆没有分地区
     * @param $e
     */
    onAddressChange($e): void {
        if (this.selectedCategory === 'Separate') {
            if (this.formModelSeparate.address.join(',') == $e.join(',')) {
                return;
            } else {
                this.formModelSeparate.address = $e;
                this.formModelSeparate.detailAddress = null;
                /*if (this.formModelSeparate.duration && this.formModelSeparate.duration.food) {
                    this.formModelSeparate.duration.food = this.formModelSeparate.duration.food.map((duration: DurationDetail) => {
                        duration.plateNumber = null;
                        return duration;
                    });
                }
                if (this.formModelSeparate.duration && this.formModelSeparate.duration.oil) {
                    this.formModelSeparate.duration.oil = this.formModelSeparate.duration.oil.map((duration: DurationDetail) => {
                        duration.plateNumber = null;
                        return duration;
                    });
                }*/
            }
        } else if (this.selectedCategory === 'Cluster') {
            if (this.formModelCluster.address.join(',') == $e.join(',')) {
                return;
            } else {
                this.formModelCluster.address = $e;
                this.formModelCluster.detailAddress = null;
                /*if (this.formModelCluster.duration && this.formModelCluster.duration.food) {
                    this.formModelCluster.duration.food = this.formModelCluster.duration.food.map((duration: DurationDetail) => {
                        duration.plateNumber = null;
                        return duration;
                    });
                }
                if (this.formModelCluster.duration && this.formModelCluster.duration.oil) {
                    this.formModelCluster.duration.oil = this.formModelCluster.duration.oil.map((duration: DurationDetail) => {
                        duration.plateNumber = null;
                        return duration;
                    });
                }*/
            }
        }
    }

    onShowMap() {
        console.log('onShowMap'); // TODO
    }

    /**
     * @param type: food | oil
     * @param category: Cluster | Separate
     */
    onAddDuration(type: string): void {
        switch (this.selectedCategory) {
            case 'Separate':    /* 普通点 | 子收运单位 */
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
                if (!this.formModelSeparate.duration[ durationType ].length) return;
                let durationS = this.formModelSeparate.duration[ durationType ].filter(item => item.idx !== idx);
                this.formModelSeparate.duration[ durationType ] = durationS;
                break;
            case 'Cluster':
                if (!this.formModelCluster.duration[ durationType ].length) return;
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
        if (!this.formModelCluster.childCollections.length) return;
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
                }
                if (!this.formModelSeparate.collectionType) {
                    this.notificationService.create({
                        type   : 'error',
                        title  : '抱歉,请检查输入内容',
                        content: '请选择单位类型',
                    });
                    return false;
                }
                if (!this.formModelSeparate.contactPersonName) {
                    this.notificationService.create({
                        type   : 'error',
                        title  : '抱歉,请检查输入内容',
                        content: '请输入联系人',
                    });
                    return false;
                }
                if (!this.formModelSeparate.mobile && !this.formModelSeparate.tel) {
                    this.notificationService.create({
                        type   : 'error',
                        title  : '抱歉,请检查输入内容',
                        content: '请输入移动电话或固定电话',
                    });
                    return false;
                }
                if (parseInt(this.formModelSeparate.hasKey) !== 0 && parseInt(this.formModelSeparate.hasKey) !== 1) {
                    this.notificationService.create({
                        type   : 'error',
                        title  : '抱歉,请检查输入内容',
                        content: '请选择是否自带钥匙',
                    });
                    return false;
                }
                if ((this.formModelSeparate.level === null || this.formModelSeparate.level === 0) && !this.formModelSeparate.duration.food.length && !this.formModelSeparate.duration.oil.length) {
                    this.notificationService.create({
                        type   : 'error',
                        title  : '抱歉,请检查输入内容',
                        content: '普通收运单位请选择至少一个收运时间段',
                    });
                    return false;
                }
                if (this.formModelSeparate.duration.food.length) {
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
                    if (!result) return;    // 停止验证
                }
                if (this.formModelSeparate.duration.oil.length) {
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
                    if (!result) return;    // 停止验证
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
                }
                if (!this.formModelCluster.collectionType) {
                    this.notificationService.create({
                        type   : 'error',
                        title  : '抱歉,请检查输入内容',
                        content: '请选择单位类型',
                    });
                    return false;
                }
                if (!this.formModelCluster.childCollections.length || !this.formModelCluster.childCollections.filter(item => !!item.name).length) {
                    this.notificationService.create({
                        type   : 'error',
                        title  : '抱歉,请检查输入内容',
                        content: '聚类点请至少输入一个子收运单位',
                    });
                    return false;
                }
                if ((this.formModelCluster.level === null || this.formModelCluster.level === 0) && !this.formModelCluster.duration.food.length && !this.formModelCluster.duration.oil.length) {
                    this.notificationService.create({
                        type   : 'error',
                        title  : '抱歉,请检查输入内容',
                        content: '聚类点请选择至少一个收运时间段',
                    });
                    return false;
                }
                if (this.formModelCluster.duration.food.length) {
                    let result = null;
                    this.formModelCluster.duration.food.forEach((item: DurationDetail) => {
                        // 判断 收运时间段中 是否有未填的必填数据
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
                    if (!result) return;    // 停止验证
                }
                if (this.formModelCluster.duration.oil.length) {
                    let result = null;
                    this.formModelCluster.duration.oil.forEach((item: DurationDetail) => {
                        // 判断 收运时间段中 是否有未填的必填数据
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
                    if (!result) return;    // 停止验证
                }
                break;
        }
        return true;
    }
}
