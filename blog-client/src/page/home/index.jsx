import React from 'react';
import Layout from '../components/layout';
import { Carousel, Tabs } from 'antd';
import ImageBanner1 from '../../images/banner1.jpg';
import ImageBanner2 from '../../images/banner2.jpg';
import ImageBanner3 from '../../images/banner3.jpg';
import ImageBanner4 from '../../images/banner4.jpg';
import './style.scss';
import Api from '../../js/Api';
import history from '../../js/history';
import Util from '../../js/Util';
const { TabPane } = Tabs;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsTypeList: [],
      newsList: [],
      newsListByType: [],
    };
  }

  componentDidMount() {
    this.initNewsType();
    this.initNewsList();
  }
  initNewsType() {
    Api.get('/type').then((res) => {
      this.setState({
        newsTypeList: res.data,
      });
    });
  }
  initNewsList() {
    Api.get('/news').then((res) => {
      this.setState({
        newsList: res.data,
      });
    });
  }
  onChange(key) {
    const { newsList } = this.state;
    const newsListByType = newsList.filter((item) => ((item || {}).newsType || {})._id === key);
    this.setState({
      newsListByType,
    });
  }
  goNewsDetail(element) {
    history.push(`/news/${element._id}`);
  }
  render() {
    const imagesList = [ImageBanner1, ImageBanner2, ImageBanner3, ImageBanner4];
    const { newsTypeList, newsList, newsListByType } = this.state;
    const defaultNewsList = newsList.filter(
      (item) => ((item || {}).newsType || {})._id === (newsTypeList[0] || {})._id,
    );
    return (
      <Layout>
        <div className="news">
          <Carousel autoplay>
            {imagesList.map((item, index) => (
              <img src={item} alt="" key={index} />
            ))}
          </Carousel>
          <div className="news-type">
            <Tabs
              defaultActiveKey={(newsTypeList[0] || {})._id}
              onChange={(key) => this.onChange(key)}
            >
              {newsTypeList.map((item, index) => (
                <TabPane tab={item.name} key={item._id}>
                  {index === 0 ? (
                    <div>
                      {defaultNewsList.map((element) => (
                        <div
                          key={element._id}
                          onClick={this.goNewsDetail.bind(this, element)}
                          className="news-item"
                        >
                          <span className="news-date">{Util.getDate(element.updatedAt)}</span>
                          <span>{element.title}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      {newsListByType.map((element) => (
                        <div
                          onClick={this.goNewsDetail.bind(this, element)}
                          key={element._id}
                          className="news-item"
                        >
                          <span className="news-date">{Util.getDate(element.updatedAt)}</span>
                          <span>{element.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </TabPane>
              ))}
            </Tabs>
          </div>
        </div>
      </Layout>
    );
  }
}
export default Home;
