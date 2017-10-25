import React from 'react';
import { connect } from 'dva';
import { ActivityIndicator, Tabs } from 'antd-mobile';
import './style.less';
import FileList from '../../components/FileList';

const TabPane = Tabs.TabPane;
class File extends React.PureComponent {
  state = {
    upBtn: false,
    open: false,
  };
  loadFileInfo = () => {
    this.props.dispatch({ type: 'file/fetchFile' });
  };
  saveActive = (key) => {
    this.props.dispatch({ type: 'route/saveKey', payload: { fileCurrentKey: [key, window.scrollY] } });
  };
  jump = (id) => {
    location.href = `${this.props.host}/write/${id}`;
  };
  renderFileList = (data, rowClass) => {
    return (
      <FileList
        loadFileInfo={this.loadFileInfo}
        data={data}
        rowArrow={rowClass === 'unchecked' ? '' : undefined}
        rowClass={rowClass}
        scrollTop={this.props.fileCurrentKey[1]}
        jump={rowClass === 'unchecked' ? undefined : this.jump}
      />
    );
  };
  render() {
    const { loading, fileCurrentKey, file } = this.props;
    const { finished, unwrite, unconfirm, unchecked } = file;
    return (
      <div>
        {
          loading && <ActivityIndicator toast text="正在加载" />
        }
        <Tabs
          onTabClick={(key) => {
            this.saveActive(key);
          }}
          className="file-container"
          activeKey={fileCurrentKey[0]}
          animated={false}
          swipeable={false}
        >
          <TabPane
            tab={
              <h5 >已完成</h5>
          } key="1"
          >
            {this.renderFileList(finished, 'finished')}
          </TabPane>
          <TabPane
            tab={
              <h5>待填写</h5>
          } key="2"
          >
            {this.renderFileList(unwrite, 'unwrite')}
          </TabPane>
          <TabPane
            tab={
              <h5>待修改</h5>
          } key="3"
          >
            {this.renderFileList(unconfirm, 'unconfirm')}
          </TabPane>
          <TabPane
            tab={
              <h5>待审批</h5>
          } key="4"
          >
            {this.renderFileList(unchecked, 'unchecked')}
          </TabPane>
        </Tabs>
      </div>

    );
  }

}
function mapStateToProps({ file, userTask: { host }, loading: { models }, route }) {
  const { hidden, rocket, fileCurrentKey } = route;
  return {
    file,
    host,
    hidden,
    rocket,
    fileCurrentKey,
    loading: models.file,
  };
}

export default connect(mapStateToProps)(File);
