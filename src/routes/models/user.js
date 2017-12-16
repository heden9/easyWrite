import { fetchUserInfo } from '../services/fetchUserInfo';

export default {
  namespace: 'user',
  state: {
    host: '',
    headimgurl: undefined,
    unconfirm: {},
    unwrite: {},
    message: false,
    num: undefined,
  },
  reducers: {
    save(state, actions) {
      return { ...state, ...actions.payload };
    },
  },
  effects: {
    *login({ payload: values }, { call, put }) {
      const { data: { headimgurl, unconfirm, unwrite, num, host } } = yield call(fetchUserInfo);
      const message = unconfirm.len != 0 || unwrite.len != 0;
      yield put({ type: 'save', payload: { headimgurl, unconfirm, unwrite, num, message, host } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({ type: 'login' });
        }
      });
    },
  },
};
