/**
 * Created by wujiahui on 2018/11/9.
 */
export class ObjectUtils {
    public static deepClone(obj: any): any {
        //var proto = Object.getPrototypeOf(obj);
        //return Object.assign({}, Object.create(proto), obj);
        return JSON.parse(JSON.stringify(obj));
    }
}
