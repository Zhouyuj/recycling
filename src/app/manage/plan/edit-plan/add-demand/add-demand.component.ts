import { Component, OnInit } from '@angular/core';

import { EditPlanService } from '../edit-plan.service';
import { DemandRes } from '../../models/demand.model';
import { PageReq } from '../../../../shared/models/page/page-req.model';
import { PageRes } from '../../../../shared/models/page/page-res.model';
import { Result } from '../../../../shared/models/response/result.model';
import { DemandModel, DemandListModel, SubDemandModel } from '../../models/demand.model';

@Component({
    selector   : 'app-add-demand',
    templateUrl: './add-demand.component.html',
    styleUrls  : [ './add-demand.component.scss' ]
})
export class AddDemandComponent implements OnInit {
    isDemandSpinning = false;
    isShowCluster = false;
    allSelected = false;
    allSelectedSub = false;
    indeterminate = false;
    indeterminateSub = false;

    selectedCluster: DemandListModel;   // 选中聚类请求

    demandListCache: DemandListModel[];

    constructor(private editPlanService: EditPlanService) {
    }

    ngOnInit() {
        this.getDemandList();
    }

    /**
     * 关键字搜索 TODO
     */
    onSearch() {
        console.log('keyword search');
    }

    onSelectDemand($e, item: DemandModel) {
        /*this.demandListCache.forEach((r: DemandModel) => {
            if (r.id === item.id) {
                r.checked = !item.checked;
            }
        });*/
        item.checked = !item.checked;
        console.log(this.demandListCache);
    }

    onShowCluster(item: DemandListModel) {
        this.isShowCluster = true;
        this.selectedCluster = item;
    }

    /**
     * 当前页全选
     */
    onSelectAll(e: boolean) {
        console.log(e);
        console.log('selectAll');
    }

    onSelectDemandSub($e, item: DemandListModel, parentId?: number) {
        item.checked = !item.checked;
        this.demandListCache.forEach((d: DemandListModel) => {
            if (d.id === parentId) {
                if (d.subTaskList.find((s: SubDemandModel) => s.checked)) {
                    d.checked = true;
                } else d.checked = false;
            }
        });
        console.log(this.demandListCache);
    }

    /**
     * 当前聚类下的子请求全选
     * @param e
     */
    onSelectSubAll(e: boolean) {
        console.log(e);
        console.log('selectSubAll');
    }

    getDemandList() {
        this.editPlanService
            .getDemandList(new PageReq(), '')
            .subscribe((res: Result<PageRes<DemandRes[]>>) => {
                if (res.data) {
                    this.demandListCache = this.demandResToTableRows(res.data.content);
                }
            });
    }

    demandResToTableRows(list: DemandModel[]): DemandListModel[] {
        return list.map((item: DemandModel) => {
            if (item.subTaskList && item.subTaskList.length > 0) {
                item.subTaskList.forEach((child: SubDemandModel) => {
                    child.checked = false;
                });
            }
            return {
                ...item, checked: false,
            };
        });
    }

}
