import React from 'react';
import { List, InputItem } from 'antd-mobile';
import { connect } from 'dva';
import './style.less';

function BasicInfo(props) {
  if (props.name) {
    return (
      <div id="basic">
        <List
          renderFooter={<div />}
          renderHeader={<span>基础信息</span>}
        >
          <InputItem
            defaultValue={props.name}
            editable={false}
          >姓名</InputItem>
          <InputItem
            defaultValue={props.gid}
            editable={false}
          >工号</InputItem>
          <InputItem
            defaultValue={props.sex}
            editable={false}
          >性别</InputItem>
          <InputItem
            defaultValue={props.birthday}
            editable={false}
          >生日</InputItem>
          <InputItem
            defaultValue={props.country}
            editable={false}
          >国籍</InputItem>
          <InputItem
            defaultValue={props.nation}
            editable={false}
          >民族</InputItem>
          <InputItem
            defaultValue={props.iswork}
            editable={false}
          >是否在职</InputItem>
          <InputItem
            defaultValue={props.education}
            editable={false}
          >学历</InputItem>
          <InputItem
            defaultValue={props.origin}
            editable={false}
          >籍贯</InputItem>
          <InputItem
            defaultValue={props.title}
            editable={false}
          >职称</InputItem>
          <InputItem
            defaultValue={props.dept}
            editable={false}
          >专业</InputItem>
          <InputItem
            defaultValue={props.idCard}
            editable={false}
          >身份证</InputItem>
          <InputItem
            defaultValue={props.email}
            editable={false}
          >邮箱</InputItem>
          <InputItem
            defaultValue={props.mobile}
            editable={false}
          >手机号</InputItem>
          <InputItem
            defaultValue={props.telephone}
            editable={false}
          >座机号</InputItem>
        </List>
      </div>
    );
  } else {
    return null;
  }
}
function mapStateToProps({ basic }) {
  return {
    ...basic,
  };
}


export default connect(mapStateToProps)(BasicInfo);
