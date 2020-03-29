import React, { Component } from 'react';
import { Modal, Form, Input, message, Select } from 'antd';
import Api from '../../../js/Api';
import Util from '../../../js/Util';
const { TextArea } = Input;
const { Option } = Select;

class HandeNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsTypeList: [],
    };
  }
  componentDidMount() {
    this.initNewsTypeList();
  }

  initNewsTypeList() {
    Api.get('/type').then((res) => {
      if (res) {
        this.setState({
          newsTypeList: res.data,
        });
      }
    });
  }

  handleOk = () => {
    const { form, title, formData, onOk } = this.props;
    const token = Util.getToken();
    form.validateFields((err, values) => {
      const postUrl = title === 'add' ? '/news' : `/news/${formData._id}`;
      const method = title === 'add' ? 'post' : 'patch';
      console.log(postUrl, method);
      if (!err) {
        Api[method](postUrl, values, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
          message.success(`${title === 'add' ? '新增' : '更新'}成功！`);
          onOk();
        });
      }
    });
  };
  handleCancel = () => {
    this.props.onCancel();
  };
  render() {
    const { title, form, formData } = this.props;
    const { newsTypeList } = this.state;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <Modal
        title={`${title === 'add' ? '新增' : '编辑'}信息`}
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
              initialValue: (formData || {}).title,
              rules: [{ required: true }],
            })(<Input placeholder="请输入标题" />)}
          </Form.Item>
          <Form.Item label="内容">
            {getFieldDecorator('content', {
              initialValue: (formData || {}).content,
              rules: [{ required: true }],
            })(<TextArea autoSize={{ minRows: 3, maxRows: 5 }} placeholder="请输入内容" />)}
          </Form.Item>
          <Form.Item label="信息来源">
            {getFieldDecorator('origin', {
              initialValue: (formData || {}).origin,
              rules: [{ required: true }],
            })(<Input placeholder="请输入信息来源" />)}
          </Form.Item>
          <Form.Item label="作者">
            {getFieldDecorator('author', {
              initialValue: (formData || {}).author,
              rules: [{ required: true }],
            })(<Input placeholder="请输入作者" />)}
          </Form.Item>
          <Form.Item label="新闻类型">
            {getFieldDecorator('newsType', {
              initialValue: ((formData || {}).newsType || {})._id,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Select placeholder="请选择新闻类型">
                {newsTypeList &&
                  newsTypeList.map((item) => (
                    <Option value={item._id} key={item._id} label={item.name}>
                      {item.name}
                    </Option>
                  ))}
              </Select>,
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
const wrappedHandeNews = Form.create({ name: 'handle-news' })(HandeNews);
export default wrappedHandeNews;
