import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { Redirect } from 'react-router-dom';
import './style.scss';
import { connect } from 'react-redux';
import { userLogin } from '../../store/login/actions';
import ImageLogo from '../../images/logo.jpeg';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  handleSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        this.props.userLogin(values);
      }
    });
  };

  render() {
    const { userData } = this.props;
    const { isLogin } = userData || {};
    if (isLogin) {
      return <Redirect to="/" />;
    }
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
      <div>
        <div className="login-wrapper">
          <div className="login-title">
            <img
              src={ImageLogo}
              alt=""
              style={{ width: '100px', height: '100px', marginRight: '20px' }}
            />
          </div>
          <div className="login">
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">
              <Form.Item label="学号">
                {getFieldDecorator('sid', {
                  rules: [{ required: true, message: '请输入学号' }],
                })(
                  <Input
                    prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="text"
                    placeholder="请输入学号"
                  />,
                )}
              </Form.Item>
              <Form.Item label="密码">
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="请输入密码"
                  />,
                )}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <div>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  userLogin: (params) => dispatch(userLogin(params)),
});

const WrappedLogin = Form.create({ name: 'sign' })(Login);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedLogin);
