import { Component, OnInit } from '@angular/core';

import { EditPlanService } from '../edit-plan.service';
import { DemandRes } from '../../models/demand.model';
import { PageReq } from '../../../../shared/models/page/page-req.model';
import { PageRes } from '../../../../shared/models/page/page-res.model';
import { Result } from '../../../../shared/models/response/result.model';
import {DemandListModel} from '../../models/demand.model';

@Component({
    selector   : 'app-add-demand',
    templateUrl: './add-demand.component.html',
    styleUrls  : [ './add-demand.component.scss' ]
})
export class AddDemandComponent implements OnInit {
    isDemandSpinning = false;
    demandListCache: any = [];

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

    onSelectDemand($e, item: DemandListModel) {
        this.demandListCache.forEach((r: DemandListModel) => {
            if (r.id === item.id) {
                r.checked = !item.checked;
            }
        });
        console.log(this.demandListCache);
    }

    getDemandList() {
        this.editPlanService.getDemandList(new PageReq(), '').subscribe((res: Result<PageRes<DemandRes[]>>) => {
            if (res.data) {
                this.demandListCache = this.demandResToTableRows(res.data.content);
            }
        });
    }

    demandResToTableRows(list: DemandRes[]): DemandListModel[] {
        let result: DemandListModel[] = list.map(item => {
            return {
                ...item, checked: false,
            };
        });
        return result;
    }

}
