
import React from 'react';
import { Accordion, List, Icon, WhiteSpace } from 'antd-mobile';
import { connect } from 'dva';
import './style.less';

const iconArr = {
  task: [require('../../assets/icon/task.svg')],
  grade: [require('../../assets/icon/grade.svg')],
  unwrite: [require('../../assets/icon/unwrite.svg')],
  unconfirm: [require('../../assets/icon/unconfirm.svg'), require('../../assets/icon/unconfirm-o.svg')],
  finished: [require('../../assets/icon/finished.svg'), require('../../assets/icon/finished-o.svg')],
  unchecked: [require('../../assets/icon/unchecked.svg'), require('../../assets/icon/unchecked-o.svg')],
};
const Progress = {
  unwrite: ['33%', '填写'],
  unconfirm: ['33%', '修改'],
  unchecked: ['66%', '审批'],
  finished: ['100%'],
};
class Home2 extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
   // this.targetEle.scrollIntoView();
  }
  render() {
    const { task_arr }: { task_arr: Array<Object> } = this.props;
    return (
      <div className="home-container">
        {
          task_arr.map((item, index, arr) => {
            // const activeKey = index === arr.length-1;
            const activeKey = index === 0;
            return (
              <div
                className="accordion-area"
                key={item.file_id + item.file_name}
                ref={(ref) => {
                  if (activeKey) {
                    this.targetEle = ref;
                  }
                }}
              >
                <AccordionItem{...item} activeKey={activeKey} />
              </div>
            );
          })
        }
        <GradeArea />
      </div>
    );
  }
}

function GradeArea() {
  return (
    <div className="grade-container">
      <div className="grade-img" />
      <div className="chart">
        <div className="list">
          <img src={require('../../assets/img/chart.png')}alt="" />
          <div className="ice">
            <img src={require('../../assets/img/chart.png')} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
function AccordionItem(props) {
  return (
    <div>
      <div className="task-icon">
        <Icon type={iconArr.task[0]} size={'25'} />
      </div>
      <Accordion openAnimation={{}} className="my-accordion" defaultActiveKey={props.activeKey ? '0' : ''}>
        <Accordion.Panel header={props.file_name}>
          <div className="panel">
            <Steps {...props} />
          </div>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
}


function Steps({ unchecked, unwrite, unconfirm, finished, now_step, task_time }) {
  return (
    <div className="steps-container">
      <div className="progress">
        <div style={{ height: Progress[now_step][0] }} />
      </div>
      {
        unconfirm.times !== '0' ?
          <StepItem {...unconfirm} name="unconfirm" now={now_step} /> :
          <StepItem {...unwrite} name="unwrite" now={now_step} />
      }
      <StepItem {...unchecked} name="unchecked" now={now_step} />
      <StepItem {...finished} name="finished" now={now_step} task_time={task_time} />
    </div>
  );
}
function StepItem({ times, timestamp, name, now, task_time }) {
  const flag = times !== '0';
  let active = now === name;
  if(now === 'unchecked' && name === 'unconfirm'){
    active = true;
  }
  return (
    <div className="step-item">
      <Icon type={iconArr[name][flag ? 0 : 1]} size="100" className={`step-icon ${active ? 'active' : ''}`} />
      {
        flag ?
          <ul>
            {
              timestamp.map((item, index) => {
                const flag = item === '0';
                let text = flag ? 'now' : 'history';
                if (times !== '0' && !flag) { text = 'err'; }
                return (
                  <li key={item}>
                    <div className="ball-item">
                      <div className={`ball ${text}`} />
                      <span>{`第${index + 1}次 ${Progress[name][1]}`}</span>
                    </div>
                    <time>{flag ? '进行中...' : item}</time>
                  </li>
                );
              })
            }
          </ul> :
          <li>
            <div className="ball-item">
              <div className="ball" />
              <span>截止时间:</span>
            </div>
            <time>{task_time}</time>
          </li>
      }
    </div>
  );
}
function mapStateToProps({ userTask }:{ userTask: Object }) {
  return {
    ...userTask,
  };
}
export default connect(mapStateToProps)(Home2);
