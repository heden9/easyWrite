// @flow
export default {

  namespace: 'route',

  state: {
    fileCurrentKey: ['1', '0'],
    homeCurrentKey: ['1', '0'],
    rocket: false,
    selectedTab: '/',
    hidden: false,
  },

  subscriptions: {
    setup({ dispatch, history }:{ dispatch: Function, history: Object }) {  // eslint-disable-line
      return history.listen(({ pathname }:{ pathname: string}) => {
        if (/\/($)|(person$)|(file$)/.test(pathname)) {
          dispatch({ type: 'loadPage', payload: { selectedTab: pathname, hidden: false } });
        } else {
          dispatch({ type: 'loadPage', payload: { hidden: true } });
        }
      });
    },
  },

  effects: {
  },

  reducers: {
    loadPage(state: Object, { payload: { selectedTab = state.selectedTab, hidden = state.hidden } }:{ payload: { selectedTab: string, hidden: boolean }}) {
      return {
        ...state,
        selectedTab,
        hidden,
      };
    },
    changeAnm(state: Object, { payload: { rocket } }:{ payload: { rocket: boolean }}) {
      return { ...state, rocket };
    },
    saveKey(state: Object, { payload: { fileCurrentKey = state.fileCurrentKey, homeCurrentKey = state.homeCurrentKey } }:{payload: { fileCurrentKey: Array<string>, homeCurrentKey: Array<string> }}) {
      return {
        ...state,
        fileCurrentKey,
        homeCurrentKey,
      };
    },
  },

};
