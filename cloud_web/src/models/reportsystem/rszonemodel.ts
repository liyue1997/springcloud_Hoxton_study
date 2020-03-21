import { queryAll } from '@/services/commonobject';
import {message} from 'antd';

export default {
    namespace: 'mrszones',
    state: {
      data:[],
    },
    effects: {
      *queryAll(self, {select, call, put }) {
        const stateArr = yield select(state => state);
        console.log("this.state.data.length",stateArr);
        if (stateArr.mrszones.data.length>0)
           return;
        const response = yield call(queryAll,{"url":"RsZone/queryRsZoneList",len:300,page:1});
        yield put({ type: 'addResponse', payload: response });
  
      }
    },
    reducers: {
      getData(state,{}){
        return state.date;
      },
      addResponse(state, { payload: response }) {
        console.log("addResponse111",response);
        //判断是否成功，如果失败，提示用户
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