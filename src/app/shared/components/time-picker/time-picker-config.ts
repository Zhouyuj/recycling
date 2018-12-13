/**
 * Created by wujiahui on 2018/12/12.
 */

export const TIMES = create();

function create() {
    let hour = 47;
    let min = 60;
    let times: [{
        value   : string,
        label   : string,
        disabled: boolean,
        children: [ { value: string, label: string, isLeaf: boolean, disabled: boolean} ],
    }] = [] as any;

    let item;
    for (let i = 0; i <= hour; i++) {   // 创建时  0-47
        let children = [];
        for (let j = 0; j < min; j++) {    // 创建分   0-59
            let value = j < 10 ? `0${j}` : `${j}`;
            children.push({
                value : value,
                label : value,
                isLeaf: true,
                disabled: false,
            });
        }
        let value = i < 10 ? `0${i}` : `${i}`;
        item = {
            value   : value,
            label   : value,
            children: children,
            disabled: false,
        };
        times.push(item);
    }
    return times;
}