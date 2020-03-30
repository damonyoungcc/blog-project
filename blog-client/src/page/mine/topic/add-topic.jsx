import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd';
import Api from '../../../js/Api';
import Util from '../../../js/Util';
const { TextArea } = Input;

class AddTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  handleOk = () => {
    const { form, onOk } = this.props;
    const token = Util.getToken();
    form.validateFields((err, values) => {
      if (!err) {
        Api.post('/topics', values, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
          message.success('新增成功！');
          onOk();
        });
      }
    });
  };
  handleCancel = () => {
    this.props.onCancel();
  };
  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    return (
      <Modal
        title={'发帖'}
        cancelText="取消"
        okText="确定"
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        destroyOnClose
      >
        <Form {...formItemLayout}>
          <Form.Item label="标题">
            {getFieldDecorator('title', {
              rules: [{ required: true }],
            })(<Input placeholder="请输入标题" />)}
          </Form.Item>
          <Form.Item label="帖子内容">
            {getFieldDecorator('content', {
              rules: [{ required: true }],
            })(<TextArea autoSize={{ minRows: 5, maxRows: 7 }} placeholder="请输入帖子内容" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
const wrappedAddTopic = Form.create({ name: 'add-topic' })(AddTopic);
export default wrappedAddTopic;
