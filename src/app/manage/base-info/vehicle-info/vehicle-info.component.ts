import { Component, OnInit, EventEmitter } from '@angular/core';

import { VehicleInfoFormComponent } from './vehicle-info-form/vehicle-info-form.component';
import { VehicleInfoService } from './vehicle-info.service';

import { NotificationService } from '../../../shared/services/notification/notification.service';
import { NzDrawerService } from 'ng-zorro-antd';

import { ModelConverter } from './model-converter';
import { ObjectUtils } from '../../../shared/utils/object-utils';
import { PageReq } from '../../../shared/models/page/page-req.model';
import { PageRes } from '../../../shared/models/page/page-res.model';
import { Result } from '../../../shared/models/response/result.model';
import { VehicleFormModel } from './vehicle-form.model';
import { VehicleRes } from './vehicle-res.model';
import { VehicleListModel } from './vehicle-list.model';
import { VehicleCategoryEnum } from './models/vehicle-category.enum';
import { ZHANGZHOU_OPTIONS } from '../../../shared/components/cascader/cascader-zhangzhou.config';

@Component({
    selector   : 'app-vehicle-info',
    templateUrl: './vehicle-info.component.html',
    styleUrls  : [ './vehicle-info.component.scss' ]
})
export class VehicleInfoComponent implements OnInit {
    /* 面包屑导航 */
    breadcrumbs = [
        {
            link : '/',
            title: '首页',
        },
        {
            link : '',
            title: '基础信息',
        },
        {
            link : '/manage/baseInfo/vehicles',
            title: '车辆信息',
        }
    ];

    public isSpinning = false;

    public pageReq = new PageReq();
    public pageRes = new PageRes();
    public params = {
        area       : '',
        typeId     : '',
        boxId      : '',
        driver     : '',
        plateNumber: '',
    };// 分页查询参数
    public sortMap = {
        buyDate: '',
    };   // 操作表格的排序参数
    public vehicleCategoryFilterList;   // 表格中筛选项
    public countyFilterList;   // 表格中筛选项

    public resCache: VehicleRes[];   // 分页接口获取的表格数据
    public selectedItemCache: VehicleRes;
    public listCache: VehicleListModel[];
    public formCache: VehicleFormModel;

    constructor(private vehicleInfoService: VehicleInfoService,
                private notificationService: NotificationService,
                private drawerService: NzDrawerService) {
    }

    ngOnInit() {
        this.initFilterOptions();
        this.getListByPage();
    }

    initFilterOptions() {
        this.vehicleCategoryFilterList = [
            { text: VehicleCategoryEnum.food5, value: VehicleCategoryEnum.food5Index },
            { text: VehicleCategoryEnum.food8, value: VehicleCategoryEnum.food8Index },
            { text: VehicleCategoryEnum.oil1, value: VehicleCategoryEnum.oil1Index },
        ];
        let zhangzhouDistricts = ZHANGZHOU_OPTIONS.map(province => {
            let zhangzhouCity;
            if (province.value === '350000') {
                zhangzhouCity = province.children.find((city) => city.value === '350600');
                return zhangzhouCity.children.map(district => {
                    return {
                        value: district.value,
                        text : district.label,
                    }
                });
            } else return [];
        });
        this.countyFilterList = zhangzhouDistricts[ 0 ];
    }

    onAdd() {
        this.onOpenForm('add');
    }

    onEdit() {
        this.onOpenForm('edit');
    }

    onDel() {
        this.vehicleInfoService.delCustomer(this.selectedItemCache.id).subscribe(
            res => {
                this.notificationService.create({
                    type   : 'success',
                    title  : '恭喜,删除成功',
                    content: '该提醒将自动消失',
                });
                this.getListByPage({ isResetReq: true });
            }, err => {
                this.notificationService.create({
                    type   : 'error',
                    title  : '抱歉,删除失败',
                    content: err ? err.error.message : '',
                });
                this.getListByPage({ isResetReq: true });
            }
        );
    }

    onExp() {
        console.log('exp');
    }

    onSelect(e: boolean, item: VehicleListModel) {
        if (!e) {
            this.selectedItemCache = null;
            return;
        }
        this.listCache.forEach((l: VehicleListModel) => {
            if (l.id === item.id) {
                l.checked = true;
            } else {
                l.checked = false;
            }
        });
        this.selectedItemCache = this.resCache.filter((o: VehicleRes) => o.id === item.id)[ 0 ];
        this.formCache = ModelConverter.vehicleResToFormModel(this.selectedItemCache);
    }

    onSelectTr(e, item: VehicleListModel) {
        this.onSelect(true, item);
    }

    /**
     * @param e : string[] | string
     * @param type
     */
    onFilter(e, type: string) {
        switch (type) {
            case 'roleId':
                let result = (e && !e.length) ? '' : e.join(',');
                if (this.params[ type ] === result) return;
                this.params[ type ] = (e && !e.length) ? '' : e.join(',');
                break;
            case 'typeId':
            case 'area':
                if (!e && !this.params[ type ] || this.params[ type ] === e) return;
                this.params[ type ] = e || '';
                break;
        }
        this.getListByPage();
    }

    /**
     * 关键字搜索
     * 双向绑定 params
     * @param type
     */
    onKeywordSearch() {
        this.getListByPage();
    }

    onPage(e) {
        this.pageReq.page = e;
        this.getListByPage();
    }

    /**
     * 排序
     * 双向绑定 sortMap
     * @param e
     * @param type
     */
    onSort(e, type: string) {
        if (!e) return;
        e = e.replace('end', '');
        this.pageReq.sort = `${type}.${e},`;
        this.pageReq.page = 1;
        this.getListByPage();
    }

    /**
     * 抽屉组件
     * form 表单
     */
    onOpenForm(type?: 'add' | 'edit'): void {
        const drawerRef = this.drawerService
            .create<VehicleInfoFormComponent, { type: string, success: boolean, cache: VehicleFormModel }, boolean>({
                nzTitle        : { add: '添加', edit: '编辑' }[ type ] || '请编辑表单',
                nzContent      : VehicleInfoFormComponent,
                nzWidth        : '55%',
                nzContentParams: {
                    type   : type,
                    success: false,
                    cache  : type === 'edit' ? this.formCache : null,
                }
            });

        drawerRef.afterOpen.subscribe(() => {
        });

        drawerRef.afterClose.subscribe(res => {
            if (res) {
                // 重新调分页接口
                this.getListByPage({ isResetReq: true });
            }
        });
    }

    getListByPage(option?: { isResetReq: boolean }) {
        if (option && option.isResetReq) {
            this.resetPageReq();
        }
        this.isSpinning = true;
        // 分页接口
        let paramsTemp = this.updateParams();
        this.vehicleInfoService
            .getVehicleList(this.pageReq, paramsTemp)
            .subscribe(
                (res: Result<PageRes<VehicleRes[]>>) => {
                    if (res.data.content) {
                        /* 缓存（返回值类型的）列表 */
                        this.resCache = res.data.content;
                        /* 组装（列表类型的）列表数据 */
                        this.listCache = this.dataToTableRows(res.data.content);
                        /* 更新列表的信息（分页/排序） */
                        this.updatePageRes(res.data);
                    }
                },
                err => {
                    this.resCache = [];
                    this.listCache = [];
                    this.isSpinning = false;
                    console.warn(`分页查询失败!!! message:${err.error.message}`);
                    this.notificationService.create({
                        type   : 'error',
                        title  : '抱歉,删除失败',
                        content: err ? err.error.message : '',
                    });
                },
                () => this.isSpinning = false
            );
    }

    dataToTableRows(data: VehicleRes[]): VehicleListModel[] {
        if (!data.length) return [];
        return data.map((o: VehicleRes) => ModelConverter.vehicleResToListModel(o));
    }

    resetPageReq(): void {
        this.pageReq.page = 1;
        this.pageReq.size = this.pageRes.size;
        this.pageReq.sort = 'buyDate.desc';
    }

    updateParams() {
        let paramsTemp = {};
        for (let k in this.params) {
            if (!this.params[ k ]) {
                this.params[ k ] = null;
            } else {
                paramsTemp[ k ] = this.params[ k ];
            }
        }
        return paramsTemp;
    }

    // 只存储分页信息,不包括数据
    updatePageRes(data: PageRes<VehicleRes[]>): void {
        this.pageRes = new PageRes(data.page, data.size, data.pages, data.total, data.last);
    }

}
