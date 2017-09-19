import { getFileInfo } from '../services/fetchUserInfo';
import { ListView } from 'antd-mobile';

export default {
  namespace: 'file',
  state: {
    unwrite: [],
    unconfirm: [],
    unchecked: [],
    finished: [],
    dataSource: null,
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    *fetchFile({ payload: values }, { call, put }) {
      const { data: { unwrite, unconfirm, unchecked, finished } } = yield call(getFileInfo);
      yield put({ type: 'save', payload: { unwrite, unconfirm, unchecked, finished } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname }) => {
        if (pathname === '/file') {
          dispatch({ type: 'fetchFile' });
        }
      });
    },
  },
};
