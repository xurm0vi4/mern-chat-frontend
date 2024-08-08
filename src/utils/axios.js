import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mern-chat-backend-kj9n.onrender.com',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export default instance;
