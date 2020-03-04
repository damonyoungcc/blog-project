import { USER_LOGIN, GET_USER_AUTH } from './action-type';
import Util from '../../js/Util';
import Api from '../../js/Api';

const actionUserLoginCreator = (type, data) => {
  const { username } = data;
  return {
    type,
    data: {
      isLogin: true, // 是否登录
      isAdminAuth: username === 'admin', // 是否是超级管理员
      username,
    },
  };
};

export const userLogin = (params) => {
  return (dispatch) => {
    return Api.post('/admin/login', params).then((res) => {
      if (res) {
        Util.setToken(res.data.token);
        dispatch(actionUserLoginCreator(USER_LOGIN, { username: 'admin' }));
      }
    });
  };
};

export const getUserAuth = () => {
  const token = Util.getToken();
  return (dispatch) => {
    if (token) {
      return Api.get('/admin/getAdminInfo', {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        if (res) {
          dispatch(actionUserLoginCreator(GET_USER_AUTH, { username: 'admin' }));
        }
      });
    } else {
      dispatch({
        type: GET_USER_AUTH,
        data: {
          isLogin: false,
          isAdminAuth: false,
          username: null,
        },
      });
    }
  };
};
