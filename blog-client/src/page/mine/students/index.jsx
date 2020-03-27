import React, { Component } from 'react';
import { Table } from 'antd';
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
              title: 'ID',
              dataIndex: '_id',
              key: '_id',
              align: 'center',
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
          ]}
        ></Table>
      </div>
    );
  }
}

export default Students;
