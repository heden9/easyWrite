import dva from 'dva';
import createLoading from 'dva-loading';
import { Toast } from 'antd-mobile';
import localStore from './utils/localStore';
import './index.less';

// 1. Initialize
// const app = dva({
//   history: browserHistory,
// });
let initialState = {};
if (localStore.getItem('store')) {
  initialState = JSON.parse(localStore.getItem('store'));
}

// 1. Initialize
const app = dva({
  initialState,
  onError: () => {
    Toast.fail('出错啦TnT');
  },
});

window.beforeunload = window.onunload = function () {
  localStore.setItem('store', JSON.stringify(app._store.getState()));
};
// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/route'));

app.model(require('./models/userTask'));

app.model(require('./models/basic'));

app.model(require('./models/file'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
