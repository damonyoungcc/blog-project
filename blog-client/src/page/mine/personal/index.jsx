import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import Api from '../../../js/Api';
import Util from '../../../js/Util';
import './style.scss';
const token = Util.getToken();

class Personal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
    };
  }

  componentDidMount() {
    this.initUserInfo();
  }

  initUserInfo() {
    Api.get('/users/info', { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
      this.setState({
        userInfo: res.data,
      });
    });
  }

  handleSubmit = (e) => {
    const { form } = this.props;
    const { userInfo } = this.state;
    const { _id } = userInfo || {};
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const {password, confirmPassword} = values;
        if(password === confirmPassword) {
          Api.patch(`/users/${_id}`, values, { headers: { Authorization: `Bearer ${token}` } }).then(
            (res) => {
              if (res) {
                message.success('更新成功，请重新登录！');
                Util.setToken('');
                window.location.reload('/');
              }
            },
          );
        } else {
          message.error('两次输入不一致！')
        }
      }
    });
  };

  render() {
    const { userInfo } = this.state;
    const { sid, fullName, nickName } = userInfo || {};
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 20,
          offset: 4,
        },
      },
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="personal-wrapper">
        <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">
          <Form.Item label="学号">
            {getFieldDecorator('sid', {
              rules: [{ required: true, message: '请输入学号' }],
              initialValue: sid,
            })(<Input disabled type="text" placeholder="请输入学号" />)}
          </Form.Item>
          <Form.Item label="姓名">
            {getFieldDecorator('fullName', {
              rules: [{ required: true, message: '请输入学号' }],
              initialValue: fullName,
            })(<Input disabled type="text" placeholder="请输入学号" />)}
          </Form.Item>
          <Form.Item label="用户名">
            {getFieldDecorator('nickName', {
              initialValue: nickName,
            })(<Input type="text" placeholder="请输入学号" />)}
          </Form.Item>
          <Form.Item label="修改密码">
            {getFieldDecorator('password')(<Input type="password" placeholder="请输入新密码" />)}
          </Form.Item>
          <Form.Item label="确认密码">
            {getFieldDecorator('confirmPassword')(
              <Input type="password" placeholder="请确认新密码" />,
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <div>
              <Button type="primary" htmlType="submit" className="login-form-button">
                更新信息
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const WrappedPersonal = Form.create({ name: 'personal' })(Personal);
export default WrappedPersonal;
