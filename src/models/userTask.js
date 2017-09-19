import {fetchUserInfo} from '../services/fetchUserInfo';
export default {
  namespace: 'userTask',
  state: {
    task_arr: [],
    message: false
  },
  reducers: {
    save(state, actions){
      return { ...state, ...actions.payload };
    },
  },
  effects: {
    *login( {payload: values} , {call, put }) {
      const { data } = yield call(fetchUserInfo);
      console.log(data);
      const message = data['task_arr'].length !== 0;
      yield put({type: 'save', payload: { ...data, message}});
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname }) => {
        if(pathname === '/'){
          dispatch({type: 'login'});
        }
      })
    }
  },
};
