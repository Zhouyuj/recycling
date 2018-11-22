/**
 * Created by wujiahui on 2018/11/2.
 */
export class VerifyUtil {

    public static isNull(o: Object): boolean {
        return o === void 0 || o === null || (o + '').replace(/\s/g, '') === '';
    }

    /**
     * 判断空
     * @param args
     * @returns {boolean}
     */
    public static isEmpty(...args: Object[]): boolean {
        return args.some(o => o === void 0 || o === null || (o + '').replace(/\s/g, '') === '');
    }

    /**
     * 判断非空
     * @param args
     * @returns {boolean}
     */
    public static isNotEmpty(...args: Object[]): boolean {
        return !VerifyUtil.isEmpty(...args);
    }

    /**
     * 深拷贝
     * @param obj
     * @returns {any}
     */
    public static deepCopy(obj: any): any {
        return JSON.parse(JSON.stringify(obj));
    }
}
