import { getOprs } from '@/services/login';
import { message } from 'antd';
const Model = {
  namespace: 'moprs',
  state: {
    // menuData: [],
  },
  effects: {
    *fetchData({ payload, callback }, {select, call, put }) {
      const {modelcode} = payload;
      const stateArr = yield select((state: any) => state);
      if (stateArr.moprs["oper_"+modelcode])
           return;
      console.log("fetchOperData modelcode",modelcode);
      let response = yield call(getOprs,modelcode);
      // let response1={"code":"0","msg":"","data":["SAVE","CREATETREE","DELETE","NEW","UPDATE","QUERY","UPLOAD","ZX","CZMM","HF","PRINT","DEAL","QR","EXPORT"]};
      // console.log("fetchData",response);
      let payload1={};
      
      if (!response.data ){
        message.error("没有这个模块权限");
        return ;
      }
      const oprs=JSON.stringify(response.data.oprset);
      // const oprs=response.data;
      payload1["oper_"+modelcode]=oprs;
      yield put({
        type: 'saveReducer',
        payload: payload1,
      });
    },
  },

  reducers: {
    saveReducer(state: any, { payload }: any) {
      // console.log("menudata",payload);
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default Model;