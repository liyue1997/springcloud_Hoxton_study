

export function getBizRoutes(){
    return [
        {
            name: '业务用户',
            path: '/BizUser/list',
            component: './biz/BizUser/list',
        },
        {
            name: '业务用户',
            path: '/BizUser/info',
            component: './biz/BizUser/info',
        },
    ];
}