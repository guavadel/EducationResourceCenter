import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const login = (email, password) => api.post('/auth/login', { email, password });
export const register = (name, email, password, role) => api.post('/auth/register', { name, email, password, role });
export const getResources = (token) => api.get('/resources', { headers: { 'x-auth-token': token } });
export const uploadResource = (token, resource) => api.post('/resources/upload', resource, { headers: { 'x-auth-token': token } });

export default api;
