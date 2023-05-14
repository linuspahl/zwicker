import axios from 'axios';
import config from './config';

const backendApi = axios.create({ baseURL: `http://${config.apiUrl}` });

export default backendApi;
