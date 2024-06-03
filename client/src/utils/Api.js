import axios from 'axios';
const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api/v1';

const Api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});
Api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 500) {
      console.error('HTTP 500 Internal Server Error:', error);

      throw new Error('Internal Server Error');
    }
    return Promise.reject(error);
  }
);
export default Api;
