import { OnInit, Component } from '@angular/core';
import { DateUtil } from '../../../shared/utils/date-utils';
import { TableBasicComponent } from '../../../manage/table-basic.component';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { HistoryService } from '../history.service';
import { DownloadReportsService } from '../../../core/services/reports/downloadReports.service';
import { PageRes } from '../../../shared/models/page/page-res.model'; 
import { VehicleInspectRecordModel } from './vehicle-inspect-record.model';


@Component({
    selector: 'app-vehicle-inspect-record',
    templateUrl: './vehicle-inspect-record.component.html',
    styleUrls: ['./vehicle-inspect-record.component.scss']
})
export class VehicleInspectRecordComponent extends TableBasicComponent implements OnInit {
    /* 面包屑导航 */
    breadcrumbs = [
        {
            link: '/',
            title: '首页'
        },
        {
            link: '',
            title: '历史记录'
        },
        {
            link: '/manage/history/exceptioncustomer',
            title: '出车检查记录'
        }
    ];
    widthConfig = ['200px', '200px', '200px', '100px', '100px', '100px', '100px', '100px', '100px', '100px', '100px', '100px', '100px'];
    date: string;
    dataSet: any[];
    dataSet2: any[];
    isSpinning: boolean = true;
    constructor (
        private notificationService: NotificationService,
        private historyService : HistoryService
    ) {
        super();
        this.dataSet = [];
        this.dataSet2 = [{
            date: '2019.04.24 00:00:00',
            dateCheck: '2019.04.24 00:12:00',
            plateNumber: '粤J999Z8',
            name: 'aaron',
            ban1: '正常'
        }];
    }

    ngOnInit() {
        this.calcTableScrollY(30);
        this.date = DateUtil.dateFormat(new Date(), 'yyyy-MM');
        this.historyService.getVehicleInspectRecordList(this.pageReq, { month: this.date})
        .subscribe(
            res => {
                /* 更新 table 分页信息 */
                this.updatePageRes(res.data);
                if (res.data.content) {
                    this.dataSet = res.data.content.map(d => {
                        d.grossDateTime = DateUtil.dateFormat(
                            new Date(d.grossDateTime),
                            'yyyy-MM-dd hh:mm:ss'
                        );
                        d.tareDateTime = DateUtil.dateFormat(
                            new Date(d.tareDateTime),
                            'yyyy-MM-dd hh:mm:ss'
                        );
                        return d;
                    });
                }
                this.isSpinning = false;
            },
            err => {
                this.isSpinning = false;
            }
        );
    }
    onPageV2(e) {
        this.pageReq.page = 2;
        this.getListByPage();
    }
    onChangeDate(date: Date) {
        if (!date) return;
        this.isSpinning = true;
        this.date = DateUtil.dateFormat(date, 'yyyy-MM');
        this.pageReq.reset();
        this.historyService.getVehicleInspectRecordList(this.pageReq, { month: this.date })
        .subscribe(
            res => {
                this.updatePageRes(res.data);
                if (res.data.content) {
                    this.dataSet = res.data.content.map(d => {
                        d.grossDateTime = DateUtil.dateFormat(
                            new Date(d.grossDateTime),
                            'yyyy-MM-dd hh:mm:ss'
                        );
                        d.tareDateTime = DateUtil.dateFormat(
                            new Date(d.tareDateTime),
                            'yyyy-MM-dd hh:mm:ss'
                        );
                        return d;
                    });
                }
                this.isSpinning = false;
            },
            err => {
                this.isSpinning = false;
                console.error(`查询出车检查记录失败！！！ messages:${err.error.message}`);
            }
        );
    }
    getListByPage(option?: { isResetReq: boolean }) {
        this.isSpinning = true;
        this.historyService.getVehicleInspectRecordList(this.pageReq, { month: this.date })
        .subscribe(
            res => {
                this.updatePageRes(res.data);
                if (res.data.content) {
                    this.dataSet = res.data.content.map(d => {
                        d.grossDateTime = DateUtil.dateFormat(
                            new Date(d.grossDateTime),
                            'yyyy-MM-dd hh:mm:ss'
                          );
                        d.tareDateTime = DateUtil.dateFormat(
                            new Date(d.tareDateTime),
                            'yyyy-MM-dd hh:mm:ss'
                        );
                        return d;
                    });
                }
                this.isSpinning = false;
            },
            err => {
                this.isSpinning = false;
                console.error(`查询出车检查记录失败！！！ messages:${err.error.message}`);
            },
            () => (this.isSpinning = false)
        );
    }
    onSearch() {
        if (!this.date) {
            this.notificationService.create({
                type: 'warning',
                content: '请输入日期'
            });
            return;
        }
    }
    onExport() {
        this.historyService.getVehicleInspectRecordReport(this.date).subscribe(res => {
            DownloadReportsService.download(res, '出车检查记录.xls');
        });
    }
    /**
     * 存储分页信息，不包括数据
     * 
     * @param data 
     */
    updatePageRes(data: PageRes<VehicleInspectRecordModel[]>):void {
        this.pageRes = new PageRes(
            data.page,
            data.size,
            data.pages,
            data.total,
            data.last
        );
    }
}