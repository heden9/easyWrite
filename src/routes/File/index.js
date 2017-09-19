import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './style.less';
import _ from 'lodash';
import { ActivityIndicator, Tabs, Icon } from 'antd-mobile';
import FileList from '../../components/FileList';
const TabPane = Tabs.TabPane;
class File extends React.PureComponent{
  state = {
    upBtn: false,
    open: false
  };
  loadFileInfo = () => {
    this.props.dispatch({type: 'file/fetchFile'});
  };
  saveActive = key => {
    this.props.dispatch({type: 'route/saveKey', payload: {fileCurrentKey: [key, window.scrollY] }});
  };
  jump = (id) => {
    this.props.dispatch(routerRedux.push(`/write/${id}`));
  };
  _renderFileList = (data,rowClass) => {
    if(data.length !== 0){
      return (
        <FileList
          loadFileInfo={this.loadFileInfo}
          data={data}
          rowArrow={rowClass === 'unchecked' ? '': undefined}
          rowClass={rowClass}
          scrollTop={this.props.fileCurrentKey[1]}
          jump={rowClass === 'unchecked' ?  undefined : this.jump}/>
      )
    }
  };
  componentWillUnmount(){
    window.onscroll = null;
  }
  componentDidMount(){

  }
  render(){
    const { loading, fileCurrentKey, file: {finished, unwrite, unconfirm, unchecked} } = this.props;
    return (
      <div>
        {
          loading && <ActivityIndicator toast text="正在加载"/>
        }
        <Tabs
          onTabClick={key=>{
            this.saveActive(key);
          }}
          className='file-container'
          activeKey={fileCurrentKey[0]}
          animated={false}
          swipeable={false}>
          <TabPane
            tab={
            <h5 >已完成</h5>
          } key="1">
            {this._renderFileList(finished,'finished')}
          </TabPane>
          <TabPane tab={
            <h5>待填写</h5>
          } key="2">
            {this._renderFileList(unwrite,'unwrite')}
          </TabPane>
          <TabPane tab={
            <h5>待修改</h5>
          } key="3">
            {this._renderFileList(unconfirm,'unconfirm')}
          </TabPane>
          <TabPane tab={
            <h5>待审批</h5>
          } key="4">
            {this._renderFileList(unchecked,'unchecked')}
          </TabPane>
        </Tabs>
      </div>

    )
  }

}
function mapStateToProps({ file,  loading: { models }, route: {hidden, rocket, fileCurrentKey} }) {
  return {
    file,
    hidden,
    rocket,
    fileCurrentKey,
    loading: models.file
  };
}

export default connect(mapStateToProps)(File);
