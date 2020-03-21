export function getPremissionRoutes(){
    return [
        {
            name: '子系统',
            path: '/TsSubsys/list',
            component: './TsSubsys/list',
        },
        {
            name: '子系统',
            path: '/TsSubsys/info',
            component: './TsSubsys/info',
        },
        {
            name: '角色模块配置',
            path: '/TsModuleRole/list',
            component: './TsModuleRole/list',
        },
        {
            name: '角色模块配置',
            path: '/TsModuleRole/info',
            component: './TsModuleRole/info',
        },
        {
            name: '权限角色',
            path: '/TsRole/list',
            component: './TsRole/list',
        },
        {
            name: '权限角色',
            path: '/TsRole/info',
            component: './TsRole/info',
        },
        {
            name: '权限模块',
            path: '/TsModule/list',
            component: './TsModule/list',
        },
        {
            name: '权限模块',
            path: '/TsModule/info',
            component: './TsModule/info',
        },
        {
            name: '权限操作',
            path: '/TsOpr/list',
            component: './TsOpr/list',
        },
        {
            name: '权限操作',
            path: '/TsOpr/info',
            component: './TsOpr/info',
        },
        {
            name: '权限操作',
            path: '/TsMenuModule/list',
            component: './TsMenuModule/list',
        },
        {
            name: '权限操作',
            path: '/TsMenuModule/info',
            component: './TsMenuModule/info',
        },
        {
            name: '子系统角色菜单树',
            path: '/TsSysRoleMenuTree/list',
            component: './TsSysRoleMenuTree/list',
        },
        {
            name: '菜单',
            path: '/TsMenuModule/list',
            component: './TsMenuModule/list',
        },
        {
            name: '子系统角色菜单树',
            path: '/TsSysRoleMenuTree/info',
            component: './TsSysRoleMenuTree/info',
        },
        {
            name: '测试',
            path: '/TsUserSetting/list',
            component: './TsUserSetting/list',
        },
        {
            name: '测试',
            path: '/TsUserSetting/info',
            component: './TsUserSetting/info',
        },
    ];
}