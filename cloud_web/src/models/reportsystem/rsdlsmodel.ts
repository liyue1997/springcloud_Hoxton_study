import { queryAll } from '@/services/commonobject';
import {message} from 'antd';

export default {
    namespace: 'mrsdls',
    state: {
      data:[],
    },
    effects: {
      *queryAll(_, { select,call, put }) {
        const stateArr = yield select(state => state);
        // console.log("this.state.data.length",stateArr);
        if (stateArr.mrsdls.data.length>0)
           return;
        const response = yield call(queryAll,{"url":"RsDls/queryRsDlsList",len:300,page:1});
        yield put({ type: 'addResponse', payload: response });
      }
    },
    reducers: {
      addResponse(state, { payload: response }) {
        console.log("addResponse",response);
        if(response.code=="200"){
          return {
            data: response.data.list,
          };
        }else{
          message.error(response.msg);
        }
        
      },
      delete(state, { payload: id }) {
        return state.filter(item => item.id !== id);
      },
    },
  };