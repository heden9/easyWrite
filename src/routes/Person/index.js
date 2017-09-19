// @flow
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { WhiteSpace } from 'antd-mobile';
import './style.less';
import Portrait from '../../routes/Portrait';
import PersonInfoList from '../../components/PersonInfoList';
function Person({ dispatch }:{ dispatch: Function }) {
  function jump(page: string,id: string) {
    dispatch(routerRedux.push(`${page}${id}`))
  }
  return (
    <div className='person-container'>
      <Portrait/>
      <WhiteSpace size={'lg'}/>
      <PersonInfoList jump={jump}/>
    </div>
  );
}

function mapStateToProps({}) {
  return {
  };
}
export default connect(mapStateToProps)(Person);
