/* modal for form UI  */

import {serviceSave,serviceList,serviceDelete,serviceById,serviceUpdate} from './formServices';

  export default {
    namespace: 'form',
    
    state: {
      reducerSave: [],
      reducerList:[],
      reducerDelete:[],
      reducerbyId:[],
      reducerUpdate:[],

    },
  
    effects: {

      *actionSave({ payload }, { call, put}) {
        const response = yield call(serviceSave, payload);
        yield put({
          type: 'reducerSave',
          payload: response.data || [],
        });
        
        const respo = yield call(serviceList,{});
        yield put({
          type: 'reducerList',
          payload: respo.data || [],
        });
        return response.data.message || [];
      },

      *actionList({ payload }, { call, put }) {
        const respo = yield call(serviceList,{});
        yield put({
          type: 'reducerList',
          payload: respo.data || [],
        });
     
      },

      *remove({ payload: id }, { call, put }) {
        const response = yield call(serviceDelete,id);
        yield put({
          type: 'reducerDelete',
          payload: response.data || [],
        });

        const respo = yield call(serviceList,{});
        yield put({
          type: 'reducerList',
          payload: respo.data || [],
        });
     
      },
      *byId({ payload: id  }, { call, put }) {
        const respo = yield call(serviceById,id);
        yield put({
          type: 'reducerbyId',
          payload: respo.data || [],
        });
     
      },
      *Edit({ payload }, { call, put}) {
        yield call(serviceUpdate, payload);
        yield put({
         type: 'reducerbyId',
         payload: [],
      });
        
        const respo = yield call(serviceList,{});
         yield put({
         type: 'reducerList',
          payload: respo.data || [],
        });
    },
  },
  
    reducers: {
      reducerSave(state, action) {
        return {
          ...state,
          reducerSave: action.payload,
        };
      },
      reducerList(state, action) {
        return {
          ...state,
          reducerList: action.payload,
        };
      },
      reducerDelete(state, action) {
        return {
          ...state,
          reducerDelete: action.payload,
        };
      },
      reducerbyId(state, action) {
        return {
          ...state,
          reducerbyId: action.payload,
        };
      },
      reducerUpdate(state, action) {
        return {
          ...state,
          reducerUpdate: action.payload,
        };
      },
     
  },
};
  