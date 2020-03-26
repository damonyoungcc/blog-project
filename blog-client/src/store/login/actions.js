import { USER_LOGIN, GET_USER_AUTH } from './action-type';
import Util from '../../js/Util';
import Api from '../../js/Api';

const actionUserLoginCreator = (type, data) => {
  return {
    type,
    data,
  };
};

export const userLogin = (params) => {
  return (dispatch) => {
    return Api.post('/users/login', params).then((res) => {
      if (res) {
        Util.setToken(res.data.token);
        dispatch(actionUserLoginCreator(USER_LOGIN, { isLogin: true }));
      }
    });
  };
};

export const getUserAuth = () => {
  const token = Util.getToken();
  return (dispatch) => {
    if (token) {
      return Api.get('/users/info', {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        if (res) {
          dispatch(actionUserLoginCreator(GET_USER_AUTH, res.data));
        }
      });
    } else {
      dispatch(actionUserLoginCreator(GET_USER_AUTH, { isLogin: false }));
    }
  };
};
