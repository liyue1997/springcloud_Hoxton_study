import request from '@/utils/request';
import { postQuery, postGet, postUpdate, postNew, postAdd, postDel, postExportExcel } from '@/utils/bizhttptool';

export interface QueryAllType {
  url: string; //RsZone/queryRsZoneList
  page: number;
  len: number;
  columnProp: string;
  columnOrder: string;
}
export interface NewObjType {
  objUrl: string; //RsZone
}
export interface GetObjType {
  objUrl: string; //RsZone
  id: string;
}
export interface UpdateObjType {
  objUrl: string; //RsZone
  Param: JSON;
}

export async function queryAll(params: QueryAllType) {

  const { url } = params;
  console.log("biz params", params);
  return postQuery(url, params);

}
export async function exportExcel(params: QueryAllType) {

  const { objUrl } = params;
  // console.log("params", params);
  return postExportExcel(objUrl, params);

}
export async function newObj(params: NewObjType) {

  const { objUrl } = params;
  // console.log("paramsnewObj", params);
  return postNew(objUrl);

}
export async function getObj(params: GetObjType) {

  const { objUrl } = params;
  // console.log("paramsgetObj", params);
  return postGet(objUrl, params.id);

}
export async function delObj(params: GetObjType) {
  // console.log("delObj",params);
  const { objUrl } = params;
  // console.log("paramsdelObj", params);
  return postDel(objUrl, params.id);

}
export async function updateObj(params: UpdateObjType) {

  const { objUrl } = params;
  // console.log("paramsupdateObj", params);
  return postUpdate(objUrl, params);

}
export async function addObj(params: UpdateObjType) {

  const { objUrl } = params;
  // console.log("paramsaddObj", params);
  return postAdd(objUrl, params);

}
