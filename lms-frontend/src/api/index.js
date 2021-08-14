import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).payload.token}`;
  }
  return req;
});

//users auth urls
export const login = (credentials) => axios.post('http://localhost:5000/api/login', credentials);

export const register = (user) => axios.post('http://localhost:5000/api/user', user);


//LMS modules
export const fetchModules = () => API.get('/getModules');

export const fetchSingleModule = (id) => API.get(`/getModule/${id}`);

export const createModules = () => API.post('/createModule');

export const updateModules = (id, updateModule) => API.patch(`/updateModule/${id}`, updateModule);

export const deleteModule = (id) => API.delete(`deleteModule/${id}`);
