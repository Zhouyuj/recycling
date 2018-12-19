/**
 * Created by wujiahui on 2018/11/9.
 */

import { LodashUtils } from './lodash-utils';

export class ObjectUtils {
    public static cloneDeep(obj: any): any {
        //return JSON.parse(JSON.stringify(obj));
        return LodashUtils.cloneDeep(obj);
    }

    /**
     * 深克隆
     * @param out
     * @returns {any}
     */
    public static extend(out) {
        if (!out) {
            console.error('对象复制:缺少源对象');
        }
        const objs = [].slice.call(arguments, 1);
        if (objs.length > 0) {
            objs.forEach(function (item, index) {
                if (typeof item !== 'object') {
                    console.error('item' + index + ' is no valid arguments, expected to be object');
                }
                else {
                    for (const key in item) {
                        if (item.hasOwnProperty(key)) {
                            if (typeof item[ key ] === 'object') {
                                out[ key ] = out[ key ] || {};  // 这步是最重要的！
                                this.extend(out[ key ], item[ key ]);
                            }
                            else {
                                out[ key ] = item[ key ];
                            }
                        }
                    }
                }
            });
        } else {
            console.warn('no objs to be copy, or done');
        }
        return out;
    }
}