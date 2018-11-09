import { Component, OnInit, EventEmitter } from '@angular/core';

import { NzDrawerService } from 'ng-zorro-antd';
import { EChartOption } from 'echarts';

import { CustomersInfoFormComponent } from './customers-info-form/customers-info-form.component';
import { CustomersInfoService } from './customers-info.service';
import { DistrictsService } from '../../../shared/services/districts/districts.service';
import { CustomerRes } from './customer-res.model';
import { PageReq } from '../../../shared/models/page/page-req.model';
import { PageRes } from '../../../shared/models/page/page-res.model';
import { Result } from '../../../shared/models/response/result.model';
import { DateUtil } from '../../../shared/utils/date-utils';
import {CustomerResV2} from './customer-res.model';
import {ModelConverter} from './model-converter';
import {FormModel} from './customers-info-form/form.model';
import {ListModel} from './list.model';

@Component({
    selector   : 'app-customers-info',
    templateUrl: './customers-info.component.html',
    styleUrls  : [ './customers-info.component.scss' ]
})
export class CustomersInfoComponent implements OnInit {
    /* 面包屑导航 */
    public breadcrumbs = [
        {
            link : '/',
            title: '首页',
        },
        {
            link : '',
            title: '基础信息',
        },
        {
            link : '/manage/baseInfo/customers',
            title: '收集点管理',
        }
    ];
    public list_options = {
        rows               : [],
        selectedRows       : [],
        localizationMessage: {
            emptyMessage   : '很抱歉, 未找到任何数据！',
            totalMessage   : '条记录(共)',
            selectedMessage: '已选中',
        },
    };
    public drawerRef: any;
    public pageReq = new PageReq();
    public countyNames: [{ code: number, name: string }];
    /* 列表的缓存 */
    public listCache: CustomerRes[];
    public itemCache: CustomerRes;
    public formCache: FormModel;

    constructor(private customersInfoService: CustomersInfoService,
                private districtsService: DistrictsService,
                private drawerService: NzDrawerService) {
    }

    ngOnInit() {
        let mock = {
            "data"  : {
                "content": [
                    {
                        "address"     : {
                            "city"           : "漳州市",
                            "cityCode"       : 350600,
                            "county"         : "龙文区",
                            "countyCode"     : 350603,
                            "detailedAddress": "福建省漳州市龙文区蓝田镇xxx",
                            "lat"            : 23.123123,
                            "lng"            : 123.123123,
                            "province"       : "福建省",
                            "provinceCode"   : 350000,
                            "street"         : "蓝田镇",
                            "streetCode"     : 350603100
                        },
                        "businessLine": {
                            "businessType"        : "Part",
                            "collectionPeriodList": [
                                {
                                    "dateType"       : "Working",
                                    "endTime"        : 10800,
                                    "garbageCategory": "KitchenWaste",
                                    "level"          : "Hard",
                                    "plateNumber"    : "粤Y88888",
                                    "startTime"      : 10800
                                }
                            ],
                            "needKey"             : true
                        },
                        "childSize"   : 0,
                        "contactInfo" : {
                            "contactName"  : "曹操",
                            "landlinePhone": "0754-85111260",
                            "mobilePhone"  : 16888888888
                        },
                        "createdDate" : "2018-11-07T15:12:19.694Z",
                        "customerList": [
                            {
                                "address"     : {
                                    "city"           : "漳州市",
                                    "cityCode"       : 350600,
                                    "county"         : "龙文区",
                                    "countyCode"     : 350603,
                                    "detailedAddress": "福建省漳州市龙文区蓝田镇xxx",
                                    "lat"            : 23.123123,
                                    "lng"            : 123.123123,
                                    "province"       : "福建省",
                                    "provinceCode"   : 350000,
                                    "street"         : "蓝田镇",
                                    "streetCode"     : 350603100
                                },
                                "businessLine": {
                                    "businessType"        : "Part",
                                    "collectionPeriodList": [
                                        {
                                            "dateType"       : "Working",
                                            "endTime"        : 10800,
                                            "garbageCategory": "KitchenWaste",
                                            "level"          : "Hard",
                                            "plateNumber"    : "粤Y88888",
                                            "startTime"      : 10800
                                        }
                                    ],
                                    "needKey"             : true
                                },
                                "contactInfo" : {
                                    "contactName"  : "曹操",
                                    "landlinePhone": "0754-85111260",
                                    "mobilePhone"  : 16888888888
                                },
                                "createdDate" : new Date().getTime(),
                                "dustbin"     : 10,
                                "id"          : 0,
                                "images"      : [
                                    {
                                        "id"  : 0,
                                        "type": "Image",
                                        "url" : "string"
                                    }
                                ],
                                "name"        : "九龙烧味或万达广场",
                                "rfidId"      : "string",
                                "type"        : {
                                    "code": "CateringIndustry",
                                    "name": "餐饮行业"
                                },
                                "username"    : "admin"
                            }
                        ],
                        "dustbin"     : 10,
                        "id"          : 0,
                        "images"      : [
                            {
                                "id"  : 0,
                                "type": "Image",
                                "url" : "string"
                            }
                        ],
                        "name"        : "九龙烧味或万达广场",
                        "rfidId"      : "string",
                        "type"        : {
                            "code": "CateringIndustry",
                            "name": "餐饮行业"
                        },
                        "username"    : "admin"
                    }
                ],
                "last"   : true,
                "page"   : 1,
                "pages"  : 0,
                "size"   : 20,
                "total"  : 0
            },
            "status": 1
        };
        this.districtsService.getDistricts('350600', 1).subscribe((res: any) => {
            this.countyNames = res.data.districts;
            //this.list_options.rows = this.dataToTableRows(mock.data.content as any);
            this.getListByPage(this.pageReq);
        });
    }

    getCountyName(code): string {
        return this.countyNames.filter((county: { name: string, code: number }) => {
            return county.code == code;
        })[ 0 ].name;
    }

    /**
     * 统一分页获取列表方法
     * @param page
     * @param params
     */
    getListByPage(page: PageReq, params?: any) {
        this.customersInfoService
            .getCustomerList(page)
            .subscribe((res: Result<PageRes<CustomerRes[]>>) => {
                this.listCache = res.data.content;
                let list = this.dataToTableRows(res.data.content);
                this.list_options.rows = list;
            }, err => console.log(`分页查询失败!!!${err}`));
    }

    updatePage(pageInfo: { count: number, pageSize: number, limit: number, offset: number }): void {
        this.pageReq.page = pageInfo.offset + 1;
        this.pageReq.size = pageInfo.pageSize;
    }

    /**
     * 将接口获取的数据转化成table rows data
     * rows = [{
     *  lngLat, images, name, countyCode, duration,
     *  detailAddress, username, totalDustbins,
     *  createTime, contactName, mobilePhone,
     * }]
     */
    dataToTableRows(data: CustomerRes[]): ListModel[] {
        return data.map((o: CustomerRes) => ModelConverter.customerResToListModel(o, this.countyNames));
    }

    onAdd() {
        console.log('add');
        this.onOpenForm('add');
    }

    onEdit(e: ListModel) {
        console.log('edit', this.list_options.selectedRows);

        this.onOpenForm('edit');
    }

    onDel(e) {
        console.log('del', this.list_options.selectedRows);
    }

    onExp() {
        console.log('exp');
    }

    onSelect(e: ListModel) {
        this.itemCache = this.listCache.filter(item => item.id == this.list_options.selectedRows[0].id)[0];
        this.formCache = ModelConverter.customerResToFormModel(this.itemCache);
        console.log('选中的res-model', this.itemCache);
        console.log('转化的form-model', this.formCache);
    }

    onSelectFilter(e) {
        console.log(e);
    }

    onSelectEmitter(e) {
        console.log(e);
    }

    onKeywordSearch(e) {
        console.log(e);
    }

    onPage(e) {
        // TODO limit通过双向绑定来实现
        // e == {count: 0, pageSize: 12, limit: 12, offset: 1}
        console.log(e);
        this.updatePage(e);
        /*this.customersInfoService.getCustomerList(this.pageReq).subscribe((res: Result<PageRes<CustomerRes[]>>) => {
         console.log(res);
         });*/
    }

    onSort(e) {
        // e.sorts[0] = { dir: 'asc'|'desc', prop: '列名' }
        console.log(e.sorts[ 0 ]);
        let columnName = e.sorts[ 0 ].prop,
            columnSort = e.sorts[ 0 ].dir,
            sort = `${columnName}.${columnSort}`;
        this.pageReq.sort = sort;
    }

    /**
     * 抽屉组件
     * form 表单
     */
    onOpenForm(type?: 'add' | 'edit'): void {
        this.drawerRef = this.drawerService.create<CustomersInfoFormComponent, { success: boolean, cache: FormModel }, boolean>({
            nzTitle        : { add: '添加', edit: '编辑' }[ type ] || '请编辑表单',
            nzContent      : CustomersInfoFormComponent,
            nzWidth        : '55%',
            nzContentParams: {
                success: false,
                cache: type === 'edit' ? this.formCache : null,
            }
        });

        this.drawerRef.afterOpen.subscribe(() => {
            //console.log('Drawer(Component) open');
        });

        this.drawerRef.afterClose.subscribe((res: boolean) => {
            //console.log('Drawer(Component) close');
            if (res) {
                // 重新调分页接口
            }
        });
    }
}
