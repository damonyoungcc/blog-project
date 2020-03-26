import { USER_LOGIN, GET_USER_AUTH } from './action-type';
const initState = {
  isLogin: false, // 是否登录
  nickName: null,
  _id: null,
  fullName: null,
};
const reducer = (state = initState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        ...action.data,
      };
    case GET_USER_AUTH:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};

export default reducer;
