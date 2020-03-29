import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd';
import Api from '../../../js/Api';
import Util from '../../../js/Util';
const token = Util.getToken();

class AddStudents extends Component {
  handleOk = () => {
    const { title, form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        Api.post('/users', values, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
          if (res) {
            message.success('添加成功！');
            this.props.onOk();
          }
        });
      }
    });
  };
  handleCancel = () => {
    this.props.onCancel();
  };
  render() {
    const { title, form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <Modal
        title={`${title}`}
        cancelText="取消"
        okText="确定"
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        destroyOnClose
      >
        <Form {...formItemLayout}>
          <Form.Item label="学号">
            {getFieldDecorator('sid', {
              rules: [{ required: true }],
            })(<Input placeholder="请输入学号" />)}
          </Form.Item>
          <Form.Item label="初始密码">
            {getFieldDecorator('password', {
              rules: [{ required: true }],
            })(<Input placeholder="请输入初始密码" />)}
          </Form.Item>
          <Form.Item label="用户名">
            {getFieldDecorator('nickName', {
              rules: [{ required: true }],
            })(<Input placeholder="请输入用户名" />)}
          </Form.Item>
          <Form.Item label="学生姓名">
            {getFieldDecorator('fullName', {
              rules: [{ required: true }],
            })(<Input placeholder="请输入学生真实姓名" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
const wrappedAddStudents = Form.create({ name: 'add-students' })(AddStudents);
export default wrappedAddStudents;
