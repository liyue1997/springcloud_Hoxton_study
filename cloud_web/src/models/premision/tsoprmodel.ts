import { queryAll } from '@/services/commonobject';
import {message} from 'antd';

export default {
    namespace: 'mtsopr',
    state: {
      data:[],
    },
    effects: {
      *queryAll(_, { select,call, put }) {
        const stateArr = yield select(state => state);
        // console.log("this.state.data.length",stateArr);
        if (stateArr.mtsopr.data.length>0)
           return;
        const response = yield call(queryAll,{"url":"TsOpr/queryTsOprList",len:300,page:1});
        yield put({ type: 'addResponse', payload: response });
      }
    },
    reducers: {
      addResponse(state, { payload: response }) {
        const colors=["DEEPPINK","TOMATO","ORANGE","FUCHSIA","REBECCAPURPLE","CHARTREUSE","SPRINGGREEN","LIMEGREEN","TEAL"
            ,"STEELBLUE","BLUE" ,"TAN","GOLDENROD" ,"BROWN","PINK" ,"CORAL","PLUM" ,"SLATEBLUE","LIME" ,"MEDIUMSEAGREEN","OLIVE"];
        for (let i=0;i<response.data.list.length;i++)
        {
          response.data.list[i].color=colors[i];
        }
        // console.log("mtsopr addResponse",response);
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