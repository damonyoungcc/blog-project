import React, { Component } from 'react';
import { Modal, Form, Input, message, Upload, Icon } from 'antd';
import Api from '../../../js/Api';
import Util from '../../../js/Util';
import './style.scss';
const { TextArea } = Input;

class AddTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
      loading: false,
    };
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
  beforeUpload = (file) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG/JPEG 类型图片');
    }
    return isJpgOrPng;
  };
  handleChange = (info) => {
    const { form } = this.props;
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({ loading: false, imageUrl: info.file.response.url }, () => {
        setTimeout(() => {
          form.setFieldsValue({
            image: info.file.response.url,
          });
        }, 0);
      });
      return;
    }
    if (info.file.status === 'error') {
      this.setState({ loading: false });
      return;
    }
  };
  render() {
    const { imageUrl, loading } = this.state;
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
    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
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
          <Form.Item label="帖子图片">
            {getFieldDecorator('image')(
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/api/upload"
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
              >
                {imageUrl ? (
                  <img src={Util.getBaseUrl(imageUrl)} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>,
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
const wrappedAddTopic = Form.create({ name: 'add-topic' })(AddTopic);
export default wrappedAddTopic;
