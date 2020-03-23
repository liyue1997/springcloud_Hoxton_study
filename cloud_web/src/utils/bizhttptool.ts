import request from '@/utils/request';
import {download} from '@/utils/request';
import {getLocalStor} from '@/utils/localStoragetool';
import { stringify } from 'qs';

export async function postNew(objecturl: string) {
  //console.log("web设置",df_const_webprename);
    return request(df_const_webprename+'api/'+objecturl+'/newObj', {
        method: 'POST',
        headers:{'Content-Type': 'application/x-www-form-urlencoded','Accept': '*/*','token':getLocalStor('token','')}
      });
}
export async function postGet(objecturl: string ,id:string) {
  //console.log("web设置",df_const_webprename);
    return request(df_const_webprename+'api/'+objecturl+'/getobj', {
        method: 'POST',
        body:stringify({'id':id}) ,
        headers:{'Content-Type': 'application/x-www-form-urlencoded','Accept': '*/*','token':getLocalStor('token','')}
      });
}
export async function postDel(objecturl: string ,id:string) {
  //console.log("web设置",df_const_webprename);
    return request(df_const_webprename+'api/'+objecturl+'/deleteobj', {
        method: 'POST',
        body:stringify({'id':id}) ,
        headers:{'Content-Type': 'application/x-www-form-urlencoded','Accept': '*/*','token':getLocalStor('token','')}
      });
}
export async function postUpdate(objecturl: string ,params:JSON) {
  //console.log("web设置",df_const_webprename);
    return request(df_const_webprename+'api/'+objecturl+'/updateobj', {
        method: 'POST',
        body:stringify(params) ,
        headers:{'Content-Type': 'application/x-www-form-urlencoded','Accept': '*/*','token':getLocalStor('token','')}
      });
}
export async function postAdd(objecturl: string ,params:JSON) {
  //console.log("web设置",df_const_webprename);
    return request(df_const_webprename+'api/'+objecturl+'/addobj', {
        method: 'POST',
        body:stringify(params) ,
        headers:{'Content-Type': 'application/x-www-form-urlencoded','Accept': '*/*','token':getLocalStor('token','')}
      });
}

export async function postQuery(queryurl: string ,param:JSON) {
  console.log("biz df_const_webprename",df_const_webprename);
    console.log("biz postQuery",queryurl);
    return request(queryurl, {
        method: 'GET',
        // body:JSON.stringify(param),
        headers:{'Content-Type': 'application/json; charset=utf-8','Accept': 'application/json','token':getLocalStor('token','')}
      });
}
export async function postExportExcel(objecturl: string ,param:JSON) {
  //console.log("web设置",df_const_webprename);
    return download(df_const_webprename+'api/'+objecturl+'/exportExcel', {
        method: 'POST',
        body:JSON.stringify(param),
        credentials: 'include',
        headers:{'Content-Type': 'application/json; charset=utf-8','Accept': 'application/json','token':getLocalStor('token','')}
      },param.filename);
}
export async function post(url: string ,body:string) {
  //console.log("web设置",df_const_webprename);
    return request(df_const_webprename+url, {
        method: 'POST',
        body:body,
        headers:{'Content-Type': 'application/x-www-form-urlencoded','Accept': '*/*','token':getLocalStor('token','')}
      });
}
// export async function postGetUser(useraccount:string) {
//     return request('df_const_webprename'+'api/TsUser/getobj', {
//         method: 'POST',
//         body:JSON.stringify({'id':id}),
//         headers:{'Content-Type': 'application/x-www-form-urlencoded','Accept': '*/*'}
//       });
// }