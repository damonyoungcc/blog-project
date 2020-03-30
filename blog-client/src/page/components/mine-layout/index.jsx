import React from 'react';
import '../layout/style.scss';
import './style.scss';
import { Layout } from 'antd';
import MineHeader from '../mine-header';
const { Header, Footer, Content } = Layout;

class CommonLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Layout className="layout">
          <Header className="header">
            <div className="content-1200">
              <MineHeader activeTab={this.props.activeTab}/>
            </div>
          </Header>
          <Content className="main">
            <div className="content-1200">{this.props.children}</div>
          </Content>
          <Footer className="footer">
            <div className="content-1200">
              <div className="footer-content">
                <div style={{ textAlign: 'center' }}>
                  黄淮学院 版权所有 豫ICP备11031969号 通讯地址：河南省驻马店市开源大道76号
                  邮政编码：463000
                </div>
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                  校办：+86-396-2853503 传真：+86-396-2853115 招生：+86-396-2853111
                  网络安全举报：+86-396-2853351 nic@huanghuai.edu.cn
                </div>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                  豫公网安备 41170202000114号
                </div>
              </div>
            </div>
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default CommonLayout;
