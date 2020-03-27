import React, { Component } from 'react';
import { Table, Tooltip, Divider, Icon } from 'antd';
import Api from '../../../js/Api';
import Util from '../../../js/Util';

const { Fragment } = React;
const token = Util.getToken();

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
    };
  }

  componentDidMount() {
    this.initStudents();
  }
  initStudents() {
    Api.get('/news', { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
      this.setState({
        tableData: res.data,
      });
    });
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
              title: 'ID',
              dataIndex: '_id',
              key: '_id',
              align: 'center',
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
                    onClick={() => this.showModal('编辑', item, 'edit')}
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
                      onClick={() => this.deleteEvent(item)}
                    />
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

export default Students;
