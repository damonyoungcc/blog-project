import React, { Component } from 'react';
import { Table, Tooltip, Divider, Icon, Button, Modal, message } from 'antd';
import HandleNews from './handle-news';
import Api from '../../../js/Api';
import Util from '../../../js/Util';
import './style.scss';

const { confirm } = Modal;
const { Fragment } = React;
const token = Util.getToken();

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      formData: {},
      isShowModal: false,
      type: '',
    };
  }

  componentDidMount() {
    this.initNews();
  }
  initNews() {
    Api.get('/news', { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
      this.setState({
        tableData: res.data,
      });
    });
  }
  deleteNews(item) {
    const _this = this;
    confirm({
      title: '确定删除？',
      content: '此操作将删除此条信息！',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        const postUrl = `/news/${item._id}`;
        Api.delete(postUrl, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
          if (res.data) {
            message.success('删除成功');
            _this.initNews();
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
  handleNews(type, item = {}) {
    this.setState({
      isShowModal: true,
      formData: item,
      type,
    });
  }
  onOk = () => {
    this.setState(
      {
        isShowModal: false,
      },
      () => {
        this.initNews();
      },
    );
  };
  render() {
    const { tableData, formData, isShowModal, type } = this.state;
    return (
      <div>
        <Button type="primary" className="add-news" onClick={this.handleNews.bind(this, 'add')}>
          发布新信息
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
              title: '新闻来源',
              dataIndex: 'origin',
              key: 'origin',
              align: 'center',
            },
            {
              title: '作者',
              dataIndex: 'author',
              key: 'author',
              align: 'center',
            },
            {
              title: '新闻分类',
              dataIndex: 'newsType',
              key: 'newsType',
              align: 'center',
              render: (row, item) => <div>{item.newsType.name}</div>,
            },
            {
              title: '操作',
              key: '操作',
              align: 'center',
              render: (row, item) => (
                <Fragment>
                  <Tooltip
                    placement="top"
                    title={'编辑'}
                    onClick={this.handleNews.bind(this, 'edit', item)}
                  >
                    <Icon type="edit" theme="twoTone" className="edit-btn table-btn-item" />
                  </Tooltip>
                  <Divider type="vertical" />
                  <Tooltip placement="top" title={'删除'}>
                    <Icon
                      type="delete"
                      theme="twoTone"
                      twoToneColor="#eb2f96"
                      className="table-btn-item"
                      onClick={() => this.deleteNews(item)}
                    />
                  </Tooltip>
                </Fragment>
              ),
            },
          ]}
        ></Table>
        <HandleNews
          formData={formData}
          title={type}
          visible={isShowModal}
          onOk={() => this.onOk()}
          onCancel={() => this.setState({ isShowModal: !isShowModal })}
        />
      </div>
    );
  }
}

export default Students;
