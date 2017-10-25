import React from 'react';
import { connect } from 'dva';
import './style.less';
import img from '../../assets/img/Drum.png';

function Portrait({ headimgurl = img, num }) {
  return (
    <div className="portrait-container">
      <div className="portrait">
        <img src={headimgurl} alt="" />
      </div>
      {
        num && <div className="title">id:{num}</div>
      }
    </div>
  );
}
function mapStateToProps({ userTask: { headimgurl, num } }) {
  return {
    headimgurl,
    num,
  };
}
export default connect(mapStateToProps)(Portrait);
