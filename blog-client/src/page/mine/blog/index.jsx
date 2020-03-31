import React, { Component } from 'react';
import { Table, Tooltip, Icon, Modal, message, Divider } from 'antd';
import Api from '../../../js/Api';
import Util from '../../../js/Util';
import history from '../../../js/history';
import './style.scss';

const { confirm } = Modal;
const { Fragment } = React;
const token = Util.getToken();

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      isShowModal: false,
      type: '',
    };
  }

  componentDidMount() {
    this.initBlog();
  }
  initBlog() {
    Api.get('/topics', { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
      this.setState({
        tableData: res.data,
      });
    });
  }
  deleteTopic(item) {
    const _this = this;
    confirm({
      title: '确定删除？',
      content: '此操作将删除此条信息！',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        const postUrl = `/topics/${item._id}`;
        Api.delete(postUrl, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
          if (res.data) {
            message.success('删除成功');
            _this.initBlog();
          } else {
            message.error('删除失败，请重试');
          }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  goDetailTopic(item) {
    history.push(`/bbs/${item._id}`);
  }

  render() {
    const { tableData } = this.state;
    return (
      <div>
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
              title: '发帖人',
              dataIndex: 'poster',
              key: 'poster',
              align: 'left',
              render: (row, item) => <div>{item.poster.nickName}</div>,
            },
            {
              title: '操作',
              key: '操作',
              align: 'center',
              render: (row, item) => (
                <Fragment>
                  <Tooltip placement="top" title={'查看帖子详情'}>
                    <Icon
                      type="delete"
                      theme="twoTone"
                      twoToneColor="#eb2f96"
                      className="table-btn-item"
                      onClick={() => this.deleteTopic(item)}
                    />
                  </Tooltip>
                  <Divider type="vertical" />
                  <Tooltip
                    placement="top"
                    title={'查看帖子详情'}
                    onClick={this.goDetailTopic.bind(this, item)}
                  >
                    <Icon type="profile" className="table-btn-item" />
                  </Tooltip>
                </Fragment>
              ),
            },
          ]}
        ></Table>
      </div>
    );
  }
}

export default Blog;
