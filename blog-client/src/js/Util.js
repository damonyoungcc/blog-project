const Util = {
  // 登录后将token存到localStorage中
  async setToken(token) {
    await localStorage.setItem('token', token);
  },
  // 取出localStorage中的token
  getToken() {
    return localStorage.getItem('token');
  },
};

export default Util;
