
export default {
  namespace: 'test',
  state: {
    data: {
      id: 2
    }
  },
  reducers: {
    save(state, { payload: data}){
      return { ...state, data:{ ...data}};
    }
  },
  effects: {},
  subscriptions: {},
};
