import React, { Component } from 'react';
import { Input, message, Form, Modal } from 'antd';
import Util from '../../js/Util';
import Api from '../../js/Api';

const { TextArea } = Input;
const token = Util.getToken();

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  handleCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };
  handleOk = () => {
    const { formData, title, form, onOk } = this.props;
    form.validateFields((err, values) => {
      if (title === '评论') {
        const { _id } = formData;
        const postParams = {
          content: values.content,
        };
        Api.post(`/comment/${_id}`, postParams, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
          if (res) {
            message.success(`${title}成功！`);
            onOk();
          }
        });
      } else {
        const { topicId, _id, commentator } = formData || {};
        const { _id: commentatorId } = commentator || {};
        const postParams = {
          content: values.content,
          topicId,
          rootCommentId: _id,
          replyTo: commentatorId,
        };
        Api.post(`/comment/${topicId}`, postParams, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
          if (res) {
            message.success(`${title}成功！`);
            onOk();
          }
        });
        console.log(postParams);
      }
    });
  };
  render() {
    const { form, title, formData } = this.props;
    const { commentator } = formData || {};
    const { nickName } = commentator || {};
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    return (
      <Modal
        title={`${title === '评论' ? `评论帖子【${formData.title}】` : `回复${nickName}】的评论`}`}
        cancelText="取消"
        okText="确定"
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        destroyOnClose
      >
        <Form {...formItemLayout}>
          <Form.Item label={title}>
            {getFieldDecorator('content', {
              rules: [{ required: true }],
            })(<TextArea autoSize={{ minRows: 3, maxRows: 5 }} placeholder={`请输入${title}`} />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const wrappedComment = Form.create({ name: 'comment' })(Comment);
export default wrappedComment;
