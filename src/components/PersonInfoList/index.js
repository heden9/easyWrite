import React from 'react';
import { List, Picker, WhiteSpace } from 'antd-mobile';
import Icon from '../../components/CustomIcon';
import './style.less';
import scientificInfo from '../../config/teachInfo.json';

const district = [

];
const iconArr = {
  basicInfo: [require('../../assets/icon/basicInfo.svg')],
  favorite: [require('../../assets/icon/favorite.svg')],
  book: [require('../../assets/icon/book.svg')],
  apple: [require('../../assets/icon/scienceResult.svg')],

};

function PersonInfoList({ jump }) {
  return (
    <div>
      <List style={{ backgroundColor: 'white' }}>
        <List.Item arrow="horizontal" onClick={jump.bind(null, 'basic', '')}>
          <div className="btn-group">
            <Icon type={iconArr.basicInfo[0]} />基础信息
          </div>
        </List.Item>
        <Picker
          onOk={e => jump('info', `/${e[0]}`)}
          data={scientificInfo} cols={1} className="forss"
        >
          <List.Item arrow="horizontal">
            <div className="btn-group">
              <Icon type={iconArr.book[0]} />教研信息
            </div>
          </List.Item>
        </Picker>
        <Picker
          onOk={e => console.log('ok', e)}
          data={district} cols={1} className="forss"
        >
          <List.Item arrow="horizontal">
            <div className="btn-group">
              <Icon type={iconArr.apple[0]} />科研信息
            </div>
          </List.Item>
        </Picker>
      </List>
      <WhiteSpace size={'lg'} style={{ background: '#f5f5f9' }} />
      <List.Item arrow="horizontal" onClick={() => {}}>
        <div className="btn-group">
          <Icon type={iconArr.favorite[0]} />我的收藏
        </div>
      </List.Item>
    </div>
  );
}
export default PersonInfoList;
