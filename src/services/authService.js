import api from './api';

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  const { accessToken, refreshToken } = response.data;

  // Store tokens
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);

  return response.data;
};

export const signup = async (user) => {
  const response = await api.post('/auth/register', user);
  const { accessToken, refreshToken } = response.data;

  // Store tokens
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);

  return response.data;
};

export const logout = () => {
  // Clear tokens on logout
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};
