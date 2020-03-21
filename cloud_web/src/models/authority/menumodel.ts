import { getMenus } from '@/services/login';

const Model = {
  namespace: 'menu',
  state: {
    menuData: [],
  },
  effects: {
    *fetchMenuData({ payload, callback }, { call, put }) {
      // console.log("fetchMenuData");
      let response = yield call(getMenus);
      let data = [];
      // let response = {
      //   "code": "0",
      //   "msg": "",
      //   "data": [
      //     {
      //       "isMenu": true,
      //       "menuid": "ts_subsys",
      //       "menuname": "子系统",
      //       "menuIcon":"home",
      //       "menus": [],
      //       "url": "/TsSubsys/list",
      //       "args": {
      //         "moduleCode": "TsSubsys"
      //       }
      //     },
      //     {
      //       "isMenu": true,
      //       "menuid": "ts_role",
      //       "menuname": "权限角色",
      //       "menuIcon":"team",
      //       "menus": [],
      //       "url": "/TsRole/list",
      //       "args": {
      //         "moduleCode": "TsRole"
      //       }
      //     },
      //     {
      //       "isMenu": true,
      //       "menuid": "ts_opr",
      //       "menuname": "权限操作",
      //       "menuIcon":"tool",
      //       "menus": [],
      //       "url": "/TsOpr/list",
      //       "args": {
      //         "moduleCode": "ts_opr"
      //       }
      //     },
      //     {
      //       "isMenu": true,
      //       "menuid": "ts_module",
      //       "menuname": "权限模块",
      //       "menuIcon":"appstore",
      //       "menus": [],
      //       "url": "/TsModule/list",
      //       "args": {
      //         "moduleCode": "ts_module"
      //       }
      //     },
      //     {
      //       "isMenu": true,
      //       "menuid": "TsModuleRole",
      //       "menuname": "角色模块配置",
      //       "menuIcon":"user-add",
      //       "menus": [],
      //       "url": "/TsModuleRole/list",
      //       "args": {
      //         "moduleCode": "ts_module_role"
      //       }
      //     },
      //     {
      //       "isMenu": true,
      //       "menuid": "TsMenuModule",
      //       "menuname": "菜单",
      //       "menuIcon":"menu",
      //       "menus": [],
      //       "url": "/TsMenuModule/list",
      //       "args": {
      //         "moduleCode": "ts_menu_module"
      //       }
      //     },
      //     {
      //       "isMenu": true,
      //       "menuid": "TsSysRoleMenuTree",
      //       "menuname": "子系统角色菜单树",
      //       "menuIcon":"share-alt",
      //       "menus": [],
      //       "url": "/TsSysRoleMenuTree/list",
      //       "args": {
      //         "moduleCode": "ts_sys_role_menu_tree"
      //       }
      //     }
      //   ]
      // };
      // console.log("menus",response.data);
      const menus=JSON.parse(response.data.menu);
      // const menus1=response.data
      menus.map(function (item:any) {
        let childdata=[] //, 'icon': subitem["menuIcon"] == '' ? 'dashboard' : subitem["menuIcon"]
        if (item.menus) {
          item.menus.map(function (subitem:any) {
            let query = "";
            for (var p in subitem.args)
              query += p + "=" + subitem.args[p] + "&";
            childdata.push({
              'name': subitem["menuname"], 'key': 'menu' + subitem["menuid"], 'icon': subitem["menuIcon"] == '' ? 'dashboard' : subitem["menuIcon"]
              , 'itempath': subitem["url"] == '' ? '/' : (subitem["url"] + "?" + query)
              , 'path':subitem["url"] == '' ? '/' : (subitem["url"] + "?" + query)
              
            });//subitem["url"] +"?"+query ('/menu'+item["menuid"]+'/')
          });
        }
        let query = "";
        for (var p in item.args)
          query += p + "=" + item.args[p] + "&";
        data.push({
          'name': item["menuname"], 'key': 'menu' + item["menuid"], 'icon': item["menuIcon"] == '' ? 'bars' : item["menuIcon"]
          , 'itempath': item["url"] == '' ? item["menuid"] : item["url"] + "?" + query
          , 'children': childdata
          , 'path': item["url"] == '' ? item["menuid"] : (item["url"] + "?" + query)
        });    
      });
      yield put({
        type: 'saveReducer',
        payload: data,
      });
    },
  },

  reducers: {
    saveReducer(state:any, action:JSON) {
      // console.log("menudata", action);
      return {
        ...state,
        menuData: action['payload'],
      };
    },
  },
};
export default Model;