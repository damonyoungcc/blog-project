import React from 'react';
import './style.scss';
import { Icon } from 'antd';
import Util from '../../../js/Util';
import history from '../../../js/history';
import Api from '../../../js/Api';
import ImageLogoText from '../../../images/logo-text.jpeg';

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

  go(type) {
    history.push('/');
  }
  render() {
    const { nickName } = this.state;

    return (
      <div className="mine-header-nav">
        <div className="home-logo">
          <div className="logo-text">
            <img className="logo-image" src={ImageLogoText} alt="" style={{ height: '55px' }} />
          </div>
          <div className="home-tab-item" onClick={this.go.bind(this, 'news')}>
            首页
          </div>
          <div className="home-tab-item active">个人中心</div>
        </div>
        <div className="nav-right">
          <div className="mine">
            <div className="icon-header">
              <Icon type="user" className="icon-mine icon" />
              <span className="user-name">{nickName}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
