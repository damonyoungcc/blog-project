import React, { Component } from 'react';
import { Table, Tooltip, Icon, Modal, message, Button } from 'antd';
import Api from '../../../js/Api';
import Util from '../../../js/Util';
import AddStudents from './add-students';
import './style.scss';
const { confirm } = Modal;
const token = Util.getToken();

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      isShowModal: false,
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

  deleteEvent = (item) => {
    const _this = this;
    confirm({
      title: '确定删除？',
      content: '此操作将删除该用户的相关信息！',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        const postUrl = `/users/${item._id}`;
        Api.delete(postUrl, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
          if (res.data) {
            message.success('删除成功');
            _this.initStudents();
          } else {
            message.error('删除失败，请重试');
          }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  onOk() {
    const { isShowModal } = this.state;
    this.setState(
      {
        isShowModal: !isShowModal,
      },
      () => {
        this.initStudents();
      },
    );
  }

  addStudents() {
    this.setState({
      isShowModal: true,
    });
  }

  render() {
    const { tableData, isShowModal } = this.state;
    return (
      <div>
        <div>
          <Button type="primary" className="add-students" onClick={this.addStudents.bind(this)}>
            添加学生
          </Button>
        </div>
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
        <AddStudents
          title="添加学生"
          visible={isShowModal}
          onOk={() => this.onOk()}
          onCancel={() => this.setState({ isShowModal: !isShowModal })}
        />
      </div>
    );
  }
}

export default Students;
