import React from 'react';
/* eslint no-dupe-keys: 0 */
import { ListView, List } from 'antd-mobile';
import './style.less';
const Item = List.Item;
function format(time) {
  const dateReg = /^([0-9]{4})[-/\.年]([0-1]?[0-9]{1})[-/\.月]([0-3]?[0-9]{1})[日]?.?([0-2]?[0-9](:[0-6][0-9]){2})?/;
  const arr = dateReg.exec(time);
  return parseInt(arr[2]) + '月' + parseInt(arr[3]) + '日';
}
export default class CharList extends React.PureComponent {
  constructor(props) {
    super(props);
    const { data } = props;
    const getRowData = (dataBlob, sectionID, rowID) => (dataBlob.s1[rowID]);
    const dataSource = new ListView.DataSource({
      getRowData,
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.dataBlob = {};
    this.rowIDs = [];
    this.genData = () => {
      data.map((item, index)=>{
        this.dataBlob[item.id + '-' + index] = item;
      })
    };
    this.genData();
    this.state = {
      dataSource: dataSource.cloneWithRows(this.dataBlob),
      hasMore: false
    };
  }
  componentDidMount(){
    // window.addEventListener('touchend',(e)=>{
    //   e.preventDefault()
    // },false)
  }
  row = (rowData, sectionID, rowID) => {
    return (
      <Item arrow="horizontal"
            onClick={()=>{this.props.jump(rowData.id)}}
            key={rowID}>
        <p>{rowData.name}<small>截止时间:{format(rowData.task_time)} </small></p>
      </Item>
    );
  };
  render() {
    return (
      <ListView
        ref="lv"
        dataSource={this.state.dataSource}
        renderRow={this.row}
        className="charList-container"
        pageSize={4}
        scrollEventThrottle={200}
        useBodyScroll={true}
      />
    );
  }
}

