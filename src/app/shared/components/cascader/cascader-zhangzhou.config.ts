/**
 * Created by wujiahui on 2018/10/17.
 */
export const ZHANGZHOU_OPTIONS = [
    {
        value   : 'zhejiang',
        label   : 'Zhejiang',
        children: [
            {
                value   : 'hangzhou',
                label   : 'Hangzhou',
                children: [
                    {
                        value : 'xihu',
                        label : 'West Lake',
                        isLeaf: true
                    }
                ]
            }, {
                value : 'ningbo',
                label : 'Ningbo',
                isLeaf: true
            }
        ],
    },
    {
        value   : 'jiangsu',
        label   : 'Jiangsu',
        children: [
            {
                value   : 'nanjing',
                label   : 'Nanjing',
                children: [
                    {
                        value : 'zhonghuamen',
                        label : 'Zhong Hua Men',
                        isLeaf: true
                    }
                ]
            }
        ]
    }
];
