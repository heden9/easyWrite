import React from 'react';
import './style.less';


export default class Drawer extends React.PureComponent {
  static defaultProps = {
    style: {},
    open: true,
  };
  componentDidMount() {
    this.drawer.addEventListener('touchmove', (e) => {
      e.preventDefault();
    });
  }
  render() {
    const { style, open, children, onOpenChange } = this.props;
    return (
      <div
        ref={ref => this.drawer = ref}
        className={`drawer-container ${open ? 'show' : 'hide'}`}
      >
        <div
          className="main-body" style={style}
        >{children}</div>
        <div className="mask" onClick={onOpenChange} />
      </div>
    );
  }
}
