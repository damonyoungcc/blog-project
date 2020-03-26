import axios from 'axios';
import Util from './Util';
const orgin = window.location.origin;
const token = Util.getToken();
const Api = axios.create({
  baseURL: `${orgin}/api/`,
  timeout: 20000,
  headers: { Authorization: `Bearer ${token}` },
});

export default Api;
