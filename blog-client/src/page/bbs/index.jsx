import React from 'react';
import Layout from '../components/layout';
import Api from '../../js/Api';
import Util from '../../js/Util';
import ImageTopic from '../../images/topic-image.jpeg';
import { Icon, Popover } from 'antd';
import './style.scss';
const token = Util.getToken();

class BBS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topicsList: [],
    };
  }

  componentDidMount() {
    this.initTopics();
  }

  initTopics() {
    Api.get('/topics', { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
      if (res) {
        this.setState({
          topicsList: res.data,
        });
      }
    });
  }

  render() {
    const { topicsList } = this.state;
    console.log(topicsList);
    return (
      <Layout>
        <div className="topics">
          <div className="topics-header">
            <div className="active">看帖</div>
            <div>图片</div>
            <div>精品</div>
            <div>视频</div>
            <div>群组</div>
          </div>
          <div className="topics-content">
            {(topicsList || []).map((item) => (
              <div key={item._id} className="topics-item">
                <div className="comment">
                  <div className="comment-wrapper">{(item || {}).commentNum || '187'}</div>
                </div>
                <div className="title">
                  <div>{item.title}</div>
                  <div
                    className="title-image"
                    style={{
                      background: `url(${Util.getBaseUrl((item || {}).image) ||
                        ImageTopic}) center no-repeat`,
                      backgroundSize: 'cover',
                    }}
                  ></div>
                </div>
                <div className="poster">
                  <Icon type="user"></Icon>
                  <Popover
                    content={
                      <div>
                        <p>学号：{(item || {}).poster.sid}</p>
                      </div>
                    }
                    title={`用户名：${(item || {}).poster.nickName}`}
                  >
                    <span style={{ marginLeft: '3px', cursor: 'pointer' }}>
                      {(item || {}).poster.nickName}
                    </span>
                  </Popover>
                </div>
                <div className="time">{Util.getTime(item.updatedAt)}</div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }
}
export default BBS;
