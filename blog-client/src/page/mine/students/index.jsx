import React, { Component } from 'react';
import { Table, Tooltip, Icon } from 'antd';
import Api from '../../../js/Api';
import Util from '../../../js/Util';

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
    Api.get('/users', { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
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
              title: '序号',
              dataIndex: 'index',
              key: 'index',
              align: 'center',
              render: (row, item, index) => index + 1,
            },
            {
              title: '学号',
              dataIndex: 'sid',
              key: 'sid',
              align: 'center',
            },
            {
              title: '昵称',
              dataIndex: 'nickName',
              key: 'nickName',
              align: 'center',
            },
            {
              title: '姓名',
              dataIndex: 'fullName',
              key: 'fullName',
              align: 'center',
            },
            {
              title: '操作',
              key: '操作',
              align: 'center',
              render: (row, item) => (
                <Tooltip placement="top" title={'删除'}>
                  <Icon
                    type="delete"
                    theme="twoTone"
                    twoToneColor="#eb2f96"
                    className="table-btn-item"
                    onClick={() => this.deleteEvent(item)}
                  />
                </Tooltip>
              ),
            },
          ]}
        ></Table>
      </div>
    );
  }
}

export default Students;
