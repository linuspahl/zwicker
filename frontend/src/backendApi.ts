import axios from 'axios';
import config from './config';

const backendApi = axios.create({
  baseURL: config.apiUrl
});

export default backendApi;