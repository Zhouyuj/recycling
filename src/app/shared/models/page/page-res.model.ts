/**
 * Created by wujiahui on 2018/11/6.
 */
export class PageRes<T> {
    constructor(public page: number = 1,      // 当前页
                public size: number = 12,     // 单页条数
                public pages?: number,        // 总页数
                public total?: number,        // 总条数
                public last?: boolean,        // 最后一页
                public content?: T            // 数据
    ) {
    }
}
