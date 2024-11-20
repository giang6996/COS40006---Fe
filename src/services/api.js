import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://localhost:7205/api',
  withCredentials: true, // Allows the refresh token to be stored in cookies
});

// Interceptor to add Authorization header with access token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor to handle token refresh logic if token expires
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post('https://localhost:7205/api/auth/new-token', null, {
          headers: { 'refreshToken': localStorage.getItem('refreshToken') }
        });
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        return api(originalRequest); // Retry the original request with new token
      } catch (err) {
        console.error("Token refresh failed: ", err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
