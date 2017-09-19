import { getBasicInfo } from '../services/fetchUserInfo';
export default {
  namespace: 'basic',
  state: {},
  reducers: {
    get(state, action){
      return {
        ...state,
        ...action.payload
      }
    }
  },
  effects: {
    *fetchBasic( {payload: values} , {call, put }) {
      const { data } = yield call(getBasicInfo);
      yield put({type: 'get', payload: { ...data }});
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname }) => {
        if(pathname === '/basic'){
          dispatch({type: 'fetchBasic'});
        }
      });
    },
  },
};
