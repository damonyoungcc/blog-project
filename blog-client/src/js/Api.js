import axios from 'axios';
const orgin = window.location.origin
const Api = axios.create({
  baseURL: `${orgin}/api/`,
  timeout: 20000,
});

export default Api;
