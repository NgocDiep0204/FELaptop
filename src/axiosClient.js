import axios from 'axios';
import router from './router';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5002/api/', 
});
export default axiosClient;