import React from 'react';
import { connect } from 'dva';
import './style.less';


function InfoPage({ params:{ id } }) {
  return (
    <div>{id}</div>
  )
}

function mapStateToProps() {
  return {

  }
}
export default connect(mapStateToProps)(InfoPage);
