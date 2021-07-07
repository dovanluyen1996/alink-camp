import axios from 'axios';

export default function execute() {
  axios.interceptors.request.use((config) => {
    console.log(config);
    return config;
  }, err => Promise.reject(err));
}
