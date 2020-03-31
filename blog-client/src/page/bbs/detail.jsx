import React, { Component } from 'react';
import MineLayout from '../components/mine-layout';
import Api from '../../js/Api';
import Util from '../../js/Util';
import ImageTopic from '../../images/topic-image.jpeg';
import { Icon, Popover } from 'antd';
import history from '../../js/history';
import ImageIcon from '../../images/icon.png';
import './detail.scss';

class BBSDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topicDetail: [],
    };
  }
  componentDidMount() {
    const { match } = this.props || {};

    const {
      params: { id },
    } = match || {};
    this.initTopic(id);
  }
  initTopic(id) {
    Api.get(`/topics/${id}`).then((res) => {
      this.setState({
        topicDetail: res.data,
      });
    });
  }

  render() {
    const { topicDetail } = this.state;
    const { title, poster, content, image, createdAt } = topicDetail || {};
    return (
      <MineLayout activeTab="帖子详情">
        <div className="topics-detail">
          <div className="topics-header">
            <div className="active">看帖</div>
            <div>图片</div>
            <div>精品</div>
            <div>视频</div>
            <div>群组</div>
          </div>
          <div className="detail-title">
            <h3>{title}</h3>
            <div className="detail-reply">
              <div>只看楼主</div>
              <div>收藏</div>
              <div className="real-reply">
                回复
                <Icon
                  type="message"
                  size="xxs"
                  style={{ marginLeft: '2px', fontSize: '14px' }}
                ></Icon>
              </div>
            </div>
          </div>
          <div className="topics-detail">
            <div className="topic-item-origin content-item">
              <div className="poster">
                <div className="louzhu-icon"></div>
                <img style={{ width: '100px', marginTop: '30px' }} src={ImageIcon} alt="" />
                <div style={{ color: '#2d64b3', marginTop: '5px' }}>{(poster || {}).nickName}</div>
              </div>
              <div className="content">
                <div>{content}</div>
                <img
                  style={{ maxHeight: '200px', marginTop: '20px' }}
                  src={Util.getBaseUrl(image)}
                  alt=""
                />
                <div className="yilou">
                  1楼 {Util.getDateAndTime(createdAt)} <span className="reply">回复</span>
                </div>
              </div>
            </div>
            {[1, 2, 3].map((item) => (
              <div className="topic-item-origin content-item">
                <div className="poster">111</div>
                <div className="content">333</div>
              </div>
            ))}
          </div>
        </div>
      </MineLayout>
    );
  }
}

export default BBSDetail;
