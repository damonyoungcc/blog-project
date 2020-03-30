import React, { Component } from 'react';
import Api from '../../js/Api';
import Util from '../../js/Util';
import MineLayout from '../components/mine-layout';
import './style.scss';
const token = Util.getToken();

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsDetail: {},
    };
  }

  componentDidMount() {
    const { match } = this.props || {};

    const {
      params: { id },
    } = match || {};
    this.initNewsDetail(id);
  }

  initNewsDetail(id) {
    Api.get(`/news/${id}`, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
      this.setState({
        newsDetail: res.data,
      });
    });
  }

  render() {
    const { newsDetail } = this.state;
    const { newsType, title, origin, updatedAt, author, content } = newsDetail || {};
    const { name } = newsType || {};
    return (
      <MineLayout activeTab="新闻详情">
        <div className="news-layout">
          <div className="news-header">
            <div>{name} >> 正文</div>
          </div>
          <div className="news-content">
            <div className="news-title">{title}</div>
            <div className="news-origin">
              <span>作者：{author || '--'}</span>
              <span>信息来源：{origin || '--'}</span>
              <span>日期：{Util.getDateAndTime(updatedAt) || '--'}</span>
            </div>
            <div className="main-content">{content}</div>
          </div>
        </div>
      </MineLayout>
    );
  }
}

export default News;
