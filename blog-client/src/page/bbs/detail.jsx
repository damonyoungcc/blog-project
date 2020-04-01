import React, { Component } from 'react';
import MineLayout from '../components/mine-layout';
import Api from '../../js/Api';
import Util from '../../js/Util';
import { Icon, Popover } from 'antd';
import ImageIcon from '../../images/icon.png';
import Comment from './comment';
import './detail.scss';

const token = Util.getToken();

class BBSDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topicDetail: [],
      commentList: [],
      isShowModal: false,
      formData: {},
      type: '',
      isShowReply: {},
      replyList: {},
    };
  }
  componentDidMount() {
    const { match } = this.props || {};
    const {
      params: { id },
    } = match || {};
    this.initTopic(id);
    this.initComment(id);
  }
  initTopic(id) {
    Api.get(`/topics/${id}`, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
      this.setState({
        topicDetail: res.data,
      });
    });
  }
  initComment(id) {
    Api.get(`/comment/${id}`, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
      this.setState({
        commentList: res.data,
      });
    });
  }
  commentTopic(topicDetail) {
    this.setState({
      isShowModal: true,
      formData: topicDetail,
      type: '评论',
    });
  }

  replay(item) {
    this.setState({
      isShowModal: true,
      formData: item,
      type: '回复',
    });
  }

  onOk = () => {
    this.setState(
      {
        isShowModal: false,
      },
      () => {
        const { match } = this.props || {};
        const {
          params: { id },
        } = match || {};
        this.initComment(id);
      },
    );
  };

  showReply(item, index) {
    const { match } = this.props || {};
    const {
      params: { id },
    } = match || {};
    const { isShowReply, replyList } = this.state;
    const { _id } = item;
    isShowReply[`${index}`] = true;
    Api.get(`/comment/${id}/${_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      replyList[`${index}`] = res.data;
      this.setState({
        isShowReply,
        replyList,
      });
    });
  }
  render() {
    const {
      topicDetail,
      isShowModal,
      formData,
      type,
      commentList,
      isShowReply,
      replyList,
    } = this.state;
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
              <div className="real-reply" onClick={this.commentTopic.bind(this, topicDetail)}>
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
                <Popover
                  placement="left"
                  content={
                    <div>
                      <p>学号：{(poster || {}).sid}</p>
                    </div>
                  }
                  title={`用户名：${(poster || {}).nickName}`}
                >
                  <div style={{ cursor: 'pointer' }}>
                    <img style={{ width: '100px', marginTop: '30px' }} src={ImageIcon} alt="" />
                    <div style={{ color: '#2d64b3', marginTop: '5px' }}>
                      {(poster || {}).nickName}
                    </div>
                  </div>
                </Popover>
              </div>
              <div className="content">
                <div>{content}</div>
                <img
                  style={{ maxHeight: '200px', marginTop: '20px' }}
                  src={Util.getBaseUrl(image)}
                  alt=""
                />
                <div className="yilou">
                  1楼 {Util.getTime(createdAt)}{' '}
                  <span className="reply" onClick={this.commentTopic.bind(this, topicDetail)}>
                    回复
                  </span>
                </div>
              </div>
            </div>
            {(commentList || []).map((item, index) => (
              <div className="topic-item-origin content-item" key={index}>
                <div className="poster">
                  <Popover
                    placement="left"
                    content={
                      <div>
                        <p>学号：{((item || {}).commentator || {}).sid}</p>
                      </div>
                    }
                    title={`用户名：${((item || {}).commentator || {}).nickName}`}
                  >
                    <div style={{ cursor: 'pointer' }}>
                      <img style={{ width: '100px', marginTop: '30px' }} src={ImageIcon} alt="" />
                      <div style={{ color: '#2d64b3', marginTop: '5px' }}>
                        {((item || {}).commentator || {}).nickName}
                      </div>
                    </div>
                  </Popover>
                </div>
                <div className="content">
                  <div>{(item || {}).content}</div>
                  {isShowReply[index] ? (
                    <div>
                      {replyList[`${index}`].map((element, indexq) => (
                        <div key={indexq} style={{borderBottom:'1px solid #c1c1c1'}}>
                          <span style={{ color: '#2d64b3', marginRight: '5px' }}>
                            {element.commentator.nickName}：
                          </span>
                          <span>{element.content}</span>
                          <span style={{ marginLeft: '15px' }}>
                            {Util.getTime(element.createdAt)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      style={{
                        color: '#2d64b3',
                        marginTop: '10px',
                        display: 'inline-block',
                        cursor: 'pointer',
                      }}
                      onClick={this.showReply.bind(this, item, index)}
                    >
                      查看回复
                      <Icon type="double-right" rotate={90} />
                    </div>
                  )}
                  <div className="yilou">
                    {index + 2}楼 {Util.getTime((item || {}).createdAt)}{' '}
                    <span className="reply" onClick={this.replay.bind(this, item)}>
                      回复
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Comment
            formData={formData}
            title={type}
            visible={isShowModal}
            onOk={() => this.onOk()}
            onCancel={() => this.setState({ isShowModal: false })}
          ></Comment>
        </div>
      </MineLayout>
    );
  }
}

export default BBSDetail;
