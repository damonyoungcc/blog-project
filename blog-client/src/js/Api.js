import axios from 'axios';
import { message } from 'antd';
import Util from './Util';
const orgin = window.location.origin;
const token = Util.getToken();
const Api = axios.create({
  baseURL: `${orgin}/api/`,
  timeout: 20000,
  headers: { Authorization: `Bearer ${token}` },
});
Api.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    const { response } = err || {};
    const { data } = response || {};
    const { message: msg } = data || {};
    message.error(msg || '未知错误！');
    return Promise.reject(err);
  },
);
export default Api;
