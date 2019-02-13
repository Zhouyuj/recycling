/**
 * Created by wujiahui on 2018/12/12.
 */

export const TIMES = create();

function create() {
    const hour = 47;
    const min = 60;
    const times: [{
        value: string,
        label: string,
        disabled: boolean,
        children: [ { value: string, label: string, isLeaf: boolean, disabled: boolean} ],
    }] = [] as any;

    let item;
    for (let i = 0; i <= hour; i++) {   // 创建时  0-47
        const children = [];
        for (let j = 0; j < min; j++) {    // 创建分   0-59
            const childrenValue = j < 10 ? `0${j}` : `${j}`;
            children.push({
                value : childrenValue,
                label : childrenValue,
                isLeaf: true,
                disabled: false,
            });
        }
        const value = i < 10 ? `0${i}` : `${i}`;
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
