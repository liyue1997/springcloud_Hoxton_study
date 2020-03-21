import { Reducer } from 'redux';
import { Effect } from 'dva';
import { stringify } from 'querystring';
import router from 'umi/router';


import { fakeAccountLogin, getFakeCaptcha,getMenus } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import {setLocalStor, getJsonStr} from '@/utils/localStoragetool';
import { message } from 'antd';

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    getCaptcha: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      console.log("访问全局变量",df_const_projectname);

      // console.log('全局变量',window);
      const response = yield call(fakeAccountLogin, payload);
      response.type=payload.type;
      if (response.code === '204') {
        response.status="ok";
      }
      else
      {
        response.status="error";
      }
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        // const response1 = yield call(getMenus, payload);
        // console.log("获取菜单",response1);
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin ) {
            if (redirect.indexOf(urlParams.origin+'/'+df_const_projectname) >=0) 
            {
              redirect = redirect.substr((urlParams.origin+'/'+df_const_projectname).length);
            }
            else
              redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1); //????
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        router.replace(redirect || '/');
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    logout() {
      const { redirect } = getPageQuery();
      // Note: There may be security issues, please note

      setLocalStor("token","");
      setLocalStor("userId","");
      setLocalStor("username","");
      setLocalStor("extendInfo","");

      // 跳转路由，刷新页面，此时 dva 中 state 数据也会在内存中重新刷新
      //https://blog.dkvirus.top/frontend/dva/exit_state_not_empty.html
      window.location.pathname = '/';
      message.success('注销成功。');

      // if (window.location.pathname !== '/user/login' && !redirect) {
      //   router.replace({
      //     pathname: '/user/login',
      //     search: stringify({
      //       redirect: window.location.href,
      //     }),
      //   });
      // }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      // console.log("payload",payload);
      if(payload.data){
        setAuthority(payload.currentAuthority);
        setLocalStor("token",payload.token);
        setLocalStor("userId",payload.data.userId);
        setLocalStor("username",payload.data.username);
        setLocalStor("extendInfo",getJsonStr(payload.data.extendInfo));
      }
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
      
      
    },
  },
};

export default Model;
