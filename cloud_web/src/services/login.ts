import request from '@/utils/request';
import { stringify } from 'qs';
import md5 from 'js-md5';
import {post} from '@/utils/httptool';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  // return request('/api/login/account', {
  //   method: 'POST',
  //   data: params,
  // });
  const { userName, password } = params;
  console.log("params",params);
  return post('auth/login',stringify({'username':userName,'password':md5(password)}));
  // return request('/b3reportSystem/auth/login', {
  //   method: 'POST',
  //   body:stringify({'username':userName,'password':md5(password)}),
  //   headers:{'Content-Type': 'application/x-www-form-urlencoded','Accept': '*/*'}
  // });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
export async function getMenus() {
  return post('api/authority/getnewMenus',stringify({'sysid':df_const_sysid}));
}
//Request URL: http://web.mingnengtech.com/b3reportSystem/api/authority/getOprs

export async function getOprs(modulecode: string) {
  return post('api/authority/getOprs',stringify({'moduleCode':modulecode}));
}
