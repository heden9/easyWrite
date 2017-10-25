import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { ActivityIndicator } from 'antd-mobile';
import './style.less';
import Portrait from '../../routes/Portrait';
import StateBar from '../../components/StateBar';

class Home extends React.PureComponent {
  constructor(...arg) {
    super(...arg);
    this.keyIndex = '1';
  }
  static propTypes = {
    unwrite: PropTypes.object.isRequired,
    unconfirm: PropTypes.object.isRequired,
    homeCurrentKey: PropTypes.array.isRequired,
    loading: PropTypes.bool,
  };
  static defaultProps = {
    unwrite: {},
    unconfirm: {},
    loading: false,
    a: 1,
  };
  jump = (id) => {
    this.props.dispatch({ type: 'route/saveKey', payload: { homeCurrentKey: this.keyIndex } });
    this.props.dispatch(routerRedux.push(`/write/${id}`));
  };
  renderStateBar = () => {
    const { unwrite, unconfirm, homeCurrentKey } = this.props;
    if (!unconfirm.len || !unwrite.len) {
      return <div>暂无通知哦</div>;
    } else {
      return (
        <StateBar
          keyIndex={homeCurrentKey}
          saveKey={(key) => { this.keyIndex = key; }}
          jump={this.jump}
          unwrite={unwrite}
          unconfirm={unconfirm}
        />
      );
    }
  };
  render() {
    const { loading } = this.props;
    return (
      <div className="">
        <Portrait />
        {
          loading && <ActivityIndicator toast text="正在加载" />
        }
        {
          this.renderStateBar()
        }
      </div>
    );
  }
}
function mapStateToProps({ user: { unconfirm, unwrite }, route: { homeCurrentKey }, loading }) {
  return {
    unconfirm,
    unwrite,
    homeCurrentKey,
    loading: loading.models.user,
  };
}

export default connect(mapStateToProps)(Home);
