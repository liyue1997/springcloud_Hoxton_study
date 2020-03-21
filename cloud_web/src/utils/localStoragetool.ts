// import {projectname} from '../../project';
// export const projectname = "";

export function setLocalStor(key: string ,value:string): void {
    localStorage.setItem(df_const_projectname+'_'+key, value);
}
export function getLocalStor(key: string,defaultvalue:string): string {
    let value =localStorage.getItem(df_const_projectname+'_'+key);
    if (value === null || value===undefined ||value==="undefined")
       return defaultvalue;
    return  value;
}

export function getJsonStr(jsondata){
    return JSON.stringify(jsondata);
}