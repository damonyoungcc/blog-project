import moment from 'moment';

const Util = {
  // 登录后将token存到localStorage中
  async setToken(token) {
    await localStorage.setItem('token', token);
  },
  // 取出localStorage中的token
  getToken() {
    return localStorage.getItem('token');
  },
  getDate(params = '') {
    return moment
      .parseZone(params)
      .local()
      .format('YYYY-MM-DD');
  },
  getDateAndTime(params = '') {
    return moment
      .parseZone(params)
      .local()
      .format('YYYY-MM-DD HH:MM:SS');
  },
};

export default Util;
