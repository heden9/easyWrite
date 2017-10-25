import React from 'react';
import { Tabs } from 'antd-mobile';
import './style.less';
import CharList from '../../components/chartList';

const TabPane = Tabs.TabPane;
export default class StateBar extends React.PureComponent {
  render() {
    const { unwrite, unconfirm, jump, saveKey, keyIndex } = this.props;
    return (
      <Tabs
        onTabClick={key => saveKey(key)}
        className="stateBar-container"
        defaultActiveKey={keyIndex[0]}
        animated={false}
        swipeable={false}
      >
        <TabPane
          tab={
            <div className="unfill swipe">
              <div>
                <i>{unwrite.len}</i>&nbsp;<b>份</b><br />
                待填写
              </div>
            </div>
          } key="1"
        >
          {renderBox(unwrite.arr, jump)}
        </TabPane>
        <TabPane
          tab={
            <div className="unchecked swipe">
              <div>
                <i>{unconfirm.len}</i>&nbsp;<b>份</b><br />
              待修改
            </div>
            </div>
        } key="2"
        >
          {renderBox(unconfirm.arr, jump)}
        </TabPane>
      </Tabs>
    );
  }
}
const renderBox = (array, jump) => (
  <CharList
    jump={jump}
    data={array}
  />
);

//
// <List style={{ backgroundColor: 'white' }} >
// {
//   array.map((item, index)=>(
//     <Item
//       onClick={(e)=>jump(item.id)}
//       arrow="horizontal"
//       key={index}
//       className="item">
//       <p>{item.name}</p>
//       <p><small>截止时间: </small>{format(item.task_time)}</p>
//     </Item>
//   ))
// }
// </List>
