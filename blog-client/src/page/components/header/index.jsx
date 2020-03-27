import React from 'react';
import './style.scss';
import { Icon, Dropdown, Menu } from 'antd';
import Util from '../../../js/Util';
import history from '../../../js/history';
import Api from '../../../js/Api';
// import ImageLogoText from '../../../images/logo-text.jpeg';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickName: '',
    };
  }
  componentDidMount() {
    this.initUserInfo();
  }

  initUserInfo() {
    const token = Util.getToken();
    Api.get('/users/info', { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
      if (res) {
        const { data } = res || {};
        const { nickName } = data || {};
        this.setState({
          nickName,
        });
      }
    });
  }

  logout() {
    Util.setToken('');
    window.location.reload('/');
  }
  goMineInfo() {
    console.log('111');
  }
  go(type) {
    if (type === 'bbs') {
      history.push('/bbs');
    } else {
      history.push('/');
    }
  }
  render() {
    const { nickName } = this.state;
    const pathName = window.location.hash.split('#')[1];
    const menu = (
      <Menu>
        <Menu.Item key="0" onClick={() => this.goMineInfo()}>
          个人中心
        </Menu.Item>
        <Menu.Item key="1" onClick={() => this.logout()}>
          退出账户
        </Menu.Item>
      </Menu>
    );

    return (
      <div className="header-nav">
        <div className="home-logo">
          <div className="logo-text">
            {/* <img className="logo-image" src={ImageLogoText} alt="" style={{ height: '55px' }} /> */}
            <div>LOGO</div>
          </div>
          <div
            className={pathName === '/' ? 'home-tab-item active' : 'home-tab-item'}
            onClick={this.go.bind(this, 'news')}
          >
            学院新闻
          </div>
          <div
            className={pathName === '/bbs' ? 'home-tab-item active' : 'home-tab-item'}
            onClick={this.go.bind(this, 'bbs')}
          >
            校园论坛
          </div>
        </div>
        <div className="nav-right">
          <div className="mine">
            <Dropdown overlay={menu}>
              <div className="icon-header">
                <Icon type="user" className="icon-mine icon" />
                <span className="user-name">{nickName}</span>
                <Icon type="caret-down" className="down icon" />
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
