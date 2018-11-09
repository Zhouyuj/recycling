/**
 * Created by wujiahui on 2018/11/6.
 */
export class Page {
    constructor(public page?: number,       // 当前页码
                public size?: number,       // 每页显示的数目
                public total?: number,      // 数据总量
                public totalPages?: number  // 总页数
    ) {
    }
}
