/**
 * Created by wujiahui on 2018/12/18.
 */


import * as _ from 'lodash';

export class LodashUtils extends _ {
    constructor() {
        super();
    }

    public static cloneDeep(target: any) {
        return _.cloneDeep(target);
    }
}