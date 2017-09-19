import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { TabBar, Icon } from 'antd-mobile';
import { scrollTo } from '../utils/utils';
import './style.less';

const iconArr = {
  people: [require('../assets/icon/people.svg'), require('../assets/icon/people-o.svg')],
  message: [require('../assets/icon/message.svg'), require('../assets/icon/message-o.svg')],
  file: [require('../assets/icon/file.svg'), require('../assets/icon/file-o.svg')],
};
const App = ({ children, rocket, hidden, selectedTab, dispatch, message }) => {
  const pressHandle = (selectedTab) => {
    dispatch(routerRedux.push(selectedTab));
  };
  return (
    <TabBar
      className="app-container"
      unselectedTintColor="#949494"
      tintColor="#6bc456"
      barTintColor="#fff"
      hidden={hidden}
    >
      <TabBar.Item
        icon={<Icon type={iconArr.message[1]} />}
        selectedIcon={<Icon type={iconArr.message[0]} />}
        title="消息"
        key="/home"
        dot={message}
        selected={selectedTab === '/'}
        onPress={() => {
          pressHandle('/');
        }}
      >{children}</TabBar.Item>
      <TabBar.Item
        icon={<Icon type={iconArr.file[1]} />}
        selectedIcon={
          <Icon type={iconArr.file[0]} onClick={scrollTo.bind(null, 0, 0)} />
        }
        title={'文档'}
        key="/file"
        selected={selectedTab === '/file'}
        onPress={() => {
          pressHandle('/file');
        }}
      >{children}</TabBar.Item>
      <TabBar.Item
        icon={<Icon type={iconArr.people[1]} />}
        selectedIcon={<Icon type={iconArr.people[0]} />}
        title="我的"
        key="/person"
        selected={selectedTab === '/person'}
        onPress={() => {
          pressHandle('/person');
        }}
        data-seed="logId1"
      >{children}</TabBar.Item>
    </TabBar>
  );
};

function mapStateToProps({ route: { selectedTab, hidden, rocket }, userTask: { message } }) {
  return {
    selectedTab,
    message,
    rocket,
    hidden,
  };
}
export default connect(mapStateToProps)(App);
