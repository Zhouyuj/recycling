/**
 * Created by wujiahui on 2018/11/6.
 */
import { PageSort } from './page-sort.model';

export class PageReq {
    constructor(public page: number = 1,    // 当前页码
                public size: number = 12,   // 每页显示的数目
                public sort?: string) {
    }

    /*public setSort(pageSort: PageSort): void {
        this.sort = pageSort.getSortString();
    }*/

    public reset() {
        this.page = 1;
        this.sort = '';
    }
}
