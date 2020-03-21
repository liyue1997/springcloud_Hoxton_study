import {message} from 'antd';
import { post } from '@/utils/httptool';

export default {
    namespace: 'mtsmenutree',
    state: {
      data:[],
    },
    effects: {
      *createtree(_, { select,call, put }) {
        // console.log("mtsmenutree createtree");
        const response = yield call(post,"api/TsSysRoleMenuTree/createtree","");
        yield put({ type: 'addResponse', payload: response });
      }
    },
    reducers: {
      addResponse(state, { payload: response }) {
        // console.log("mtsmenutree addResponse",response);
        if(response.code=="200"){
          message.success(response.msg);
          return {};
        }else{
          message.error(response.msg);
          return {};
        }
        
      },
      delete(state, { payload: id }) {
        return state.filter(item => item.id !== id);
      },
    },
  };