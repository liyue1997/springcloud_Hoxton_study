import request from '@/utils/request';
import {postGet} from '@/utils/httptool';
import {getLocalStor} from '@/utils/localStoragetool';

export async function query(): Promise<any> {
  console.log("query err","未实现的方法");
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return postGet('TsUser',getLocalStor('userId',''));
}

export async function queryNotices(): Promise<any> {
  console.log("queryNotices err","未实现的方法");
  return request('/api/notices');
}
