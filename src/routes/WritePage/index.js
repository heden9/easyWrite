import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd-mobile';
import './style.less';

class WritePage extends React.PureComponent{
  render(){
    const { state, params: { id}, dispatch} = this.props;
    return (
      <div>
        write page {id}<br/>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    state
  }
}

export default connect(mapStateToProps)(WritePage);
