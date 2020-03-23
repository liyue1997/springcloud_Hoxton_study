import { queryAll,getObj,updateObj,newObj,addObj,delObj,exportExcel } from '@/services/bizobject';

export default {
    namespace: 'bizobject',
    state: {
      data:[],
    },
    effects: {
        *queryData({ params, callback }, { call }) {
          console.log('bizobject queryData',params);
            const data = yield call(queryAll, params);
            console.log('bizobject queryData data',data);
            if (callback && typeof callback === 'function') {
              if (data) {
                callback(data);
              }
            }
          },
          
        *exportExcel({ params, callback }, { call,put }) {
          yield put({
            type: 'save',
            payload: {
              exporting: true,
            },
          });
             yield call(exportExcel, params);
            yield put({
              type: 'save',
              payload: {
                exporting: true,
              },
            });
          },
        *queryData2({ params, callback }, { call,put }) {
              const response = yield call(queryAll, params);
              yield put({ type: 'addResponse', payload: response });
            },
        *newobj({ params, callback }, { call }) {
                const data = yield call(newObj, params);
                if (callback && typeof callback === 'function') {
                  if (data) {
                    callback(data);
                  }
                }
              },
        *getobj({ params, callback }, { call }) {
                const data = yield call(getObj, params);
                if (callback && typeof callback === 'function') {
                  if (data) {
                    callback(data);
                  }
                }
              },
        *deleteobj({ params, callback }, { call }) {
                const data = yield call(delObj, params);
                if (callback && typeof callback === 'function') {
                  if (data) {
                    callback(data);
                  }
                }
              },
        *deleteobjs({ids, params, callback }, { call }) {
          let success_count=0;
          let err_count=0;
          let err_msg="";
          for(let i=0;i<ids.length;i++)
          {
            const data = yield call(delObj,{...params,id:ids[i]} );
            if (data["code"] === "202")
               success_count++;
            else
            {
              err_count++;
              err_msg+=","+ids[i]+":"+data["msg"]||'删除失败';
            }
            
          }
                // const data = yield call(delObj, params);
                if (callback && typeof callback === 'function') {
                  // if (data) {
                    callback({
                      code:err_count==0?"202":"-1",
                      msg:err_msg
                    });
                  // }
                }
              },
        *updateobj({ params, callback }, { call }) {
                const data = yield call(updateObj, params);
                if (callback && typeof callback === 'function') {
                  if (data) {
                    callback(data);
                  }
                }
              },
        *createtree({ params, callback }, { call }) {
          const data = yield call(createtree, params);
          if (callback && typeof callback === 'function') {
            if (data) {
              callback(data);
            }
          }
        },
        *addobj({ params, callback }, { call }) {
                const data = yield call(addObj, params);
                if (callback && typeof callback === 'function') {
                  if (data) {
                    callback(data);
                  }
                }
              },
    },
    reducers: {
      save(state, { payload }) {
        return {
          ...state,
          ...payload,
        };
      },
        addResponse(state, { payload: response }) {
            // console.log("addResponse",response);
            return {
              data: response.data.list,
            };
          },
    },
  };