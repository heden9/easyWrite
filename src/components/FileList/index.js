import React from 'react';
/* eslint no-dupe-keys: 0 */
import { ListView, List } from 'antd-mobile';
import EmptyIcon from '../EmptyIcon';
import './style.less';

const Item = List.Item;

export default class FileList extends React.PureComponent {
  constructor(props) {
    super(props);
    const { data } = props;
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.dataBlob = {};
    this.sectionIDs = [];
    this.rowIDs = [];
    this.genData = (data) => {
      Object.keys(data).forEach((item, index) => {
        this.sectionIDs.push(item);
        this.dataBlob[item] = item;
        this.rowIDs[index] = [];
        data[item].forEach((jitem, jindex) => {
          this.rowIDs[index].push(`${jitem.id}-${jindex}`);
          this.dataBlob[`${jitem.id}-${jindex}`] = jitem;
        });
      });
    };
    this.genData(data);
    this.state = {
      dataSource: dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
      isLoading: false,
      hasMore: false,
    };
  }
  static defaultProps = {
    data: [],
    rowClass: '',
    rowArrow: 'horizontal',
    jump: '',
  };
  componentDidMount() {
    this.refs.lv && this.refs.lv.scrollTo(0, 0);
    // you can scroll to the specified position
    // setTimeout(() => this.refs.lv.refs.listview.scrollTo(0, 200), 800); // also work
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps, a) {
  //   console.log(nextProps.data === a.data);
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
  //     });
  //   }
  // }
  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.props.loadFileInfo();
      this.genData(this.props.data);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
        isLoading: false,
      });
    }, 1000);
  };
  row = (rowData, sectionID, rowID) => {
    const setting = rowData.finish_time != 0 ? 'finish_time' : 'task_time';
    const time = rowData[setting].split('-')[2].split(' ')[0];
    return (
      <Item arrow={this.props.rowArrow} onClick={this.props.jump && this.props.jump.bind(null, rowData.id)} key={rowID}>
        <div className="file-item">
          <div className={`date ${this.props.rowClass}`}>
            <i />
            {time}
          </div>
          <p>{rowData.name}</p>
        </div>
      </Item>
    );
  };
  render() {
    if (this.state.dataSource.length === 0) {
      return (
        <EmptyIcon />
      );
    } else {
      return (
        <ListView
          ref="lv"
          dataSource={this.state.dataSource}
          renderFooter={() => (<div className="footer">
            {this.state.isLoading ? '加载中...' : <div>我也是有底线的</div>}
            <div className="line" />
          </div>)}
          renderSectionHeader={sectionData => (
            <div className="section-item">{`${sectionData.split('-')[0]}年${sectionData.split('-')[1]}月`}</div>
          )}
          renderRow={this.row}
          renderSectionBodyWrapper={sectionID => (
            <div key={sectionID} style={{ backgroundColor: '#f5f5f9' }} />
          )}
          className="fileList-container"
          pageSize={4}
          scrollEventThrottle={200}
          // onEndReached={this.onEndReached}
          useBodyScroll
        />
      );
    }
  }
}

