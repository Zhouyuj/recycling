/**
 * Created by wujiahui on 2018/9/17.
 */
export const HEADER_CONFIG = {
    logo      : 'assets/images/logo-green.png',
    title     : '翰南环境',
    home      : './',
    menus     : [
        {
            text  : '实时监控',
            icon  : 'glyphicon glyphicon-modal-window',
            router: [ './' ]
        },
        {
            text  : '方案管理',
            icon  : 'glyphicon glyphicon-tasks',
            router: [ './profile', 'greengerong' ]
        },
        {
            text    : '基础信息',
            icon    : 'glyphicon glyphicon-info-sign',
            children: [
                {
                    text  : '人员管理',
                    router: [ '/manage/staff' ],
                },
                {
                    text  : '车辆管理',
                    router: [ '/manage/vehicle' ],
                },
                {
                    text  : '收运单位管理',
                    router: [ '/manage/customer' ],
                }
            ],
        },
        {
            text    : '历史查询',
            icon    : 'glyphicon glyphicon-calendar',
            children: [
                {
                    text  : 'Resource',
                    header: true
                },
                {
                    text  : 'Blog',
                    url   : 'https://greengerong.github.io/rebirth/blog/home',
                    target: '_blank'
                },
                {
                    text: 'Questions'
                },
                {
                    divider: true
                },
                {
                    text  : 'Books',
                    header: true
                },
                {
                    text  : 'Angular.js best practices',
                    icon  : 'glyphicon glyphicon-book',
                    url   : 'http://item.jd.com/11845736.html',
                    target: '_blank'
                },
                {
                    text: 'NG-Book2',
                    icon: 'glyphicon glyphicon-book',
                    url : '#'
                }
            ]
        },
        {
            text  : '车队管理',
            icon  : 'glyphicon glyphicon-wrench',
            router: [ './rebirth', { portal: 'rebirth-ng' } ]
        },
        {
            text  : '数据统计',
            icon  : 'glyphicon glyphicon-stats',
            router: [ './rebirth', { portal: 'rebirth-ng' } ]
        },
        {
            text  : '系统设置',
            icon  : 'glyphicon glyphicon-cog',
            router: [ './rebirth', { portal: 'rebirth-ng' } ]
        },
    ],
    rightMenus: [
        {
            icon    : 'glyphicon glyphicon-user',
            target  : '_blank',
            text    : '欢迎您, ',
            children: [
                {
                    text: 'Profile',
                    url : '#MenuBar'
                },
                {
                    text: 'Settings',
                    url : '#MenuBar'
                },
                {
                    text: 'Logout',
                    url : '#MenuBar'
                },
            ]
        }
    ]
};
