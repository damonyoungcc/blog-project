import React, { Component } from 'react';
import MineLayout from '../components/mine-layout';
import { Tabs } from 'antd';
import Util from '../../js/Util';
import Api from '../../js/Api';
import './style.scss';
import Students from './students';
import News from './news';
import Blog from './blog';
import Personal from './personal';
import Topic from './topic';
const { TabPane } = Tabs;

class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
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
        const { sid } = data || {};
        this.setState({
          isAdmin: sid === '0001',
        });
      }
    });
  }

  render() {
    const { isAdmin } = this.state;
    return (
      <div>
        <MineLayout activeTab="个人中心">
          <div className="mine-content">
            {isAdmin ? (
              <Tabs defaultActiveKey="1">
                <TabPane tab="学生管理" key="1">
                  <Students />
                </TabPane>
                <TabPane tab="信息发布管理" key="3">
                  <News />
                </TabPane>
                <TabPane tab="论坛管理" key="4">
                  <Blog />
                </TabPane>
              </Tabs>
            ) : (
              <Tabs defaultActiveKey="1">
                <TabPane tab="个人资料" key="1">
                  <Personal />
                </TabPane>
                <TabPane tab="我的帖子" key="2">
                  <Topic />
                </TabPane>
              </Tabs>
            )}
          </div>
        </MineLayout>
      </div>
    );
  }
}

export default Mine;
