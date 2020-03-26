import React from 'react';
import './style.scss';
import { Layout } from 'antd';
import CommonHeader from '../header';
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
              <CommonHeader />
            </div>
          </Header>
          <Content className="main">
            <div className="content-1200">{this.props.children}</div>
          </Content>
          <Footer className="footer">
            <div className="content-1200">
              <div className="footer-content" />
            </div>
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default CommonLayout;
