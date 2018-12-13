/**
 * Created by wujiahui on 2018/11/8.
 */
import { CustomerRes } from './customer-res.model';
/**
 * 列表所需column的字段
 */
export class ListModel {
    id: number = null;
    lngLat: string = null;
    images: [{ id: number, type: string, url: string }] = null;
    name: string = null;
    countyName: string = null;
    duration: number = null;
    detailAddress: string = null;
    username: string = null;
    totalDustbins: number = null;
    createdDate: string = null;
    contactName: string = null;
    mobilePhone: number = null;
    landlinePhone: string = null;
    category: string = null;    // Cluster | Separate
    level: number = null; // 0 | 1（0:普通点/聚类点; 1:子收集点）
    customerList: ListModel[] = null; // 此字段与level用于展示 row detail
    expand = false;    // 展开（聚类点）
    checked = false;    // 多选
    disabled = false;   // 是否可选
    parent = null;      // 存储父亲（聚类点）,用于遍历展开还是收起
}
