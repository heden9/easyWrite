import React from 'react';
import empty from '../../assets/img/empty.png';
import './style.less';

export default function EmptyIcon() {
  return (
    <div className="empty-icon-container">
      <img src={empty} alt="" />
      <h5>暂无填表信息TnT</h5>
    </div>
  );
}
