import axios from 'axios';

const instance = axios.create({
  // baseURL: `REACT_APP_SERVER_URL`,
  baseURL: `${process.env.REACT_DEPLOY_SERVER}`,
});

export default instance;
