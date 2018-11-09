/**
 * Created by wujiahui on 2018/11/6.
 */
export class PageSort {
    /*private _sorts?: Map<string, 'DESC' | 'ASC' | 'desc' | 'asc'>;

    constructor(private sort?: string) {
        this._sorts = new Map<string, 'DESC' | 'ASC' | 'desc' | 'asc'>();
    }

    public addSort(field: string, direction: 'DESC' | 'ASC' | 'desc' | 'asc'): PageSort {
        this._sorts.set(field, direction);
        this.toSortField();
        return this;
    }

    public clearSort(): PageSort {
        this._sorts.clear();
        this.toSortField();
        return this;
    }

    public getSortString(): string {
        return this.sort;
    }

    private toSortField() {
        if (this._sorts && this._sorts.size > 0) {
            let sortList = [];
            this._sorts.forEach((val, key) => {
                sortList.push(key + "," + val);
            });
            this.sort = sortList.reduce((o1: string, o2: string) => o1 + ';' + o2);
        }
    }*/
}
