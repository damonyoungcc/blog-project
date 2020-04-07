import React, { Component } from 'react';
import { Table, Tooltip, Icon, Button } from 'antd';
import AddTopic from './add-topic';
import Api from '../../../js/Api';
import Util from '../../../js/Util';
import history from '../../../js/history';
import './style.scss';

const { Fragment } = React;
const token = Util.getToken();

class Topics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      isShowModal: false,
      type: '',
    };
  }

  componentDidMount() {
    this.initTopics();
  }
  initTopics() {
    Api.get('/users/topics/list', { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
      this.setState({
        tableData: res.data,
      });
    });
  }

  goToTopicDetail(item) {
    history.push(`/bbs/${item._id}`)
  }

  handleNews(type) {
    this.setState({
      isShowModal: true,
      type,
    });
  }
  onOk = () => {
    this.setState(
      {
        isShowModal: false,
      },
      () => {
        this.initTopics();
      },
    );
  };
  render() {
    const { tableData, isShowModal, type } = this.state;
    return (
      <div>
        <Button type="primary" className="add-topic" onClick={this.handleNews.bind(this, 'add')}>
          发帖
        </Button>
        <Table
          bordered
          dataSource={tableData}
          rowKey={(row) => row._id}
          columns={[
            {
              title: '序号',
              dataIndex: 'index',
              key: 'index',
              align: 'center',
              render: (row, item, index) => index + 1,
            },
            {
              title: '标题',
              dataIndex: 'title',
              key: 'title',
              align: 'left',
            },
            {
              title: '操作',
              key: '操作',
              align: 'center',
              render: (row, item) => (
                <Fragment>
                  <Tooltip placement="top" title={'查看帖子详情'}>
                    <Icon
                      type="profile"
                      className="table-btn-item"
                      onClick={() => this.goToTopicDetail(item)}
                    />
                  </Tooltip>
                </Fragment>
              ),
            },
          ]}
        ></Table>
        <AddTopic
          title={type}
          visible={isShowModal}
          onOk={() => this.onOk()}
          onCancel={() => this.setState({ isShowModal: !isShowModal })}
        />
      </div>
    );
  }
}

export default Topics;
