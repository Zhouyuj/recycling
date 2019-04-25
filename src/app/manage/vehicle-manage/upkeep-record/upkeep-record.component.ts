import { OnInit, Component } from '@angular/core';
import { TableBasicComponent } from '../../table-basic.component';
import { DateUtil } from 'src/app/shared/utils/date-utils';
import { PageRes } from 'src/app/shared/models/page/page-res.model';
import { VehicleManageService } from '../vehicle-manage.service';
import { NzDrawerService } from 'ng-zorro-antd';
import { UpkeepRecordInfoFormComponent } from './upkeep-record-info-form/upkeep-record-info-form.component';
import { UpkeepRecordFormModel } from '../model/upkeep-record-form.model';
import { UpkeepRecordRes } from '../model/upkeep-record-res.model';
import { UpkeepRecordListModel } from '../model/upkeep-record-list.model';
import { ModelConverter } from './model-converter';
import { ModalService } from '../../../shared/services/modal/modal.service';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { PageReq } from 'src/app/shared/models/page/page-req.model';
import { DownloadReportsService } from 'src/app/core/services/reports/downloadReports.service';

@Component({
    selector: 'app-upkeep-record',
    templateUrl: './upkeep-record.component.html',
    styleUrls: []
})
export class UpkeepRecordComponent extends TableBasicComponent implements OnInit {
    /* 面包屑导航 */
    breadcrumbs = [
        {
            link: '/',
            title: '首页'
        },
        {
            link: '/manage/vehiclemanage/upkeeprecord',
            title: '车队管理'
        },
        {
            link: '/',
            title: '保养记录'
        }
    ];
    address = [];
    street: number;
    isSpinning = false;
    date: string;
    params = {
        date: '',
        plateNumber: '',
        upkeepContent: ''
    }
    formCache: any;
    dataSet: any[] = [];
    resCache: UpkeepRecordRes[];
    selectedItemCache: UpkeepRecordRes;
    
    constructor(
        private vehicleManageService: VehicleManageService,
        private drawerService: NzDrawerService,
        private modalService: ModalService,
        private notificationService: NotificationService
    ) {
        super();
    }

    ngOnInit() {
        this.params.date = DateUtil.dateFormat(new Date(), 'yyyy-MM');
        this.getListByPage({isResetReq: true});
    }

    onChangeDate(date) {
        this.params.date = DateUtil.dateFormat(date, 'yyyy-MM');
    }

    onKeywordSearchTh(keywordType: string){
        const hasKeyword: boolean = Boolean(
            Object.values(this.params).find(param => !!param)
        );
        if (keywordType && hasKeyword) {
            this.pageRes.size = 500;
        } else {
            this.pageRes.size = 12;
        }
        this.getListByPage({ isResetReq: true });
    }

    getListByPage(option?: { isResetReq: boolean }){
        if (option && option.isResetReq) {
            this.resetPageReq();
        }
        this.isSpinning = true;
        const paramsTemp = this.updateParams();
        this.vehicleManageService.getUpkeepRecordList(this.pageReq, paramsTemp)
        .subscribe(
            res => {
                if (res.data.content) {
                    this.resCache = res.data.content;
                    /* 组装（列表类型的）列表数据 */
                    this.dataSet = this.dataToTableRows(res.data.content);
                }
                this.updatePageRes(res.data);
                this.isSpinning = false;
            },
            err => {
                this.isSpinning = false;
                console.error(`查询保养记录失败！！！ messages:${err.error.message}`);
            },
            () => (this.isSpinning = false)
        );
    }

    resetPageReq(): void {
        this.pageReq.page = 1;
        this.pageReq.size = this.pageRes.size;
        this.pageReq.sort = 'createdDate.desc';
    }

    updateParams() {
        const paramsTemp =  {};
        for (const k in this.params) {
            if (!this.params[k]) {
                this.params[k] = null;
            } else {
                paramsTemp[k] = this.params[k];
            }
        }
        return paramsTemp;
    }

    /**
     * 存储分页信息，不包括数据
     * @param data
     */
    updatePageRes(data: PageRes<any>): void {
        this.pageRes = new PageRes(
            data.page,
            data.size,
            data.pages,
            data.total,
            data.last
        );
    }

    onSelected(e: boolean, item: UpkeepRecordListModel) {
        if (!e) {
            this.selectedItemCache = null;
            return;
        }
        this.dataSet.forEach((d: UpkeepRecordListModel) => {
            if (d.id === item.id) {
                d.checked = true;
            } else {
                d.checked = false;
            }
        });
        this.selectedItemCache = this.resCache.filter(
            (o: UpkeepRecordRes) => {
                return o.id === item.id;
            }
        )[0];
        this.formCache = ModelConverter.upkeepRecordResToFormModel(this.selectedItemCache);
    }

    onSelectedTr(e, item) {
        e.stopPropagation(true);
        this.onSelected(true, item);
    }

    onSearch() {
        this.getListByPage({isResetReq: true});
    }

    onAdd() {
        this.onOpenForm('add');
    }

    onEdit() {
        this.onOpenForm('edit');
    }

    onDel() {
        this.modalService.createDeleteConfirm({
            onOk: () => {
                this.vehicleManageService.delUpkeepRecord(this.selectedItemCache.id).subscribe(
                    res => {
                        this.notificationService.create({
                            type: 'success',
                            title: '恭喜，删除成功',
                            content: '该提醒将自动消失'
                        });
                        this.getListByPage({ isResetReq: true });
                        this.selectedItemCache = null;
                        this.formCache = null;
                    },
                    err => {
                        this.getListByPage({isResetReq: true});
                        this.selectedItemCache = null;
                        this.formCache = null;
                    }
                );
            }
        });
    }

    onExp() {
        const paramsTemp = this.updateParams();
        let pageReq = new PageReq();
        pageReq.page = 1;
        pageReq.size = 300000;
        this.vehicleManageService.getUpkeepRecordReportData(this.pageReq, paramsTemp).subscribe(
           res => {
                DownloadReportsService.download(
                    res,
                    `汽车保养记录统计表.xls`
                );
           }
        );
    }

    onPage(e) {
        this.pageReq.page = e;
        this.getListByPage();
    }

    onOpenForm(type?: 'add' | 'edit'): void {
        const drawerRef = this.drawerService.create<
            UpkeepRecordInfoFormComponent,
            { type: string; success: boolean; cache: UpkeepRecordFormModel},
            boolean
        >({
            nzTitle: {add: '添加', edit: '编辑'}[type] || '请编辑表单',
            nzContent: UpkeepRecordInfoFormComponent,
            nzWidth: '55%',
            nzContentParams: {
                type: type,
                success: false,
                cache: type === 'edit' ? this.formCache : null
            }
        });

        drawerRef.afterOpen.subscribe(() => {});

        drawerRef.afterClose.subscribe(res => {
            if (res) {
                if (type === 'add') {
                    this.getListByPage({isResetReq: true});
                } else {
                    this.getListByPage();
                }
            }
        });
    }
    dataToTableRows(data: UpkeepRecordRes[]): UpkeepRecordListModel[] {
        if (!data.length) {
            return [];
        }
        return data.map((o: UpkeepRecordRes) => ModelConverter.upkeepRecordResToListModel(o));
    }
}