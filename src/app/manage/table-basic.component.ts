export class TableBasicComponent {

    private _tableScrollY = '500px';

    protected get tableScrollY(): string {
        return this._tableScrollY;
    }

    public calcTableScrollY(offsetHeight = 0) {
        const headerHeight = 54;
        const breadcrumbsHeight = 52;
        const tableHeadHeight = 78;
        const tablePaginationHeight = 32;
        const tablePaginationMargin = 16;
        this._tableScrollY = `${
            window.innerHeight -
            headerHeight -
            breadcrumbsHeight -
            tableHeadHeight -
            tablePaginationHeight -
            (tablePaginationMargin * 2) -
            offsetHeight
        }px`;
    }
}
