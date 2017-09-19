import React from 'react';
import './style.less';
import img from '../../assets/img/Drum.png';
import { connect } from 'dva';
function Portrait({ headimgurl, num }) {
  return (
    <div className='portrait-container'>
      <div className='portrait'>
        <img src={img} alt=""/>
      </div>
      {
        num && <div className='title'>id:{num}</div>
      }
    </div>
  );
}
function mapStateToProps({ userTask: { headimgurl, num} }) {
  return {
    headimgurl,
    num
  }
}
export default connect(mapStateToProps)(Portrait);
