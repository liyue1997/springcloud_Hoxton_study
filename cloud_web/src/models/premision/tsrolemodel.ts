import { queryAll } from '@/services/commonobject';
import {message} from 'antd';

export default {
    namespace: 'mtsrole',
    state: {
      data:[],
    },
    effects: {
      *queryAll(_, { select,call, put }) {
        const stateArr = yield select(state => state);
        // console.log("this.state.data.length",stateArr);
        if (stateArr.mtsrole.data.length>0)
        {
          console.log("角色数据已经存在");
          return;

        }
        const response = yield call(queryAll,{"url":"TsRole/queryTsRoleList",len:300,page:1});
        yield put({ type: 'addResponse', payload: response });
      }
    },
    reducers: {
      addResponse(state, { payload: response }) {
        console.log("mtsrole addResponse",response);
        if(response.code=="200"){
          return {
            data: response.data.list,
          };
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