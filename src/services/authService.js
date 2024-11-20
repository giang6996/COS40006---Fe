import api from './api';
import { jwtDecode } from 'jwt-decode';

export const isTokenValid = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const now = Date.now().valueOf() / 1000;
    return decoded.exp > now; // Check if token expiration is in the future
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
};

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  const { accessToken, refreshToken } = response.data;

  // Store tokens
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);

  return response.data;
};

export const getUserRole = () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    const decoded = jwtDecode(token);

    // Check for the role claim
    return decoded['role'] || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }
  return 'Resident'; // Default to Resident if no role is found
};

export const getUserProfile = () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    const decoded = jwtDecode(token);
    return decoded['nameid'] || decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
  }
  return null;
};

// export const signup = async (user) => {
//   const response = await api.post('/auth/register', user);
//   const { accessToken, refreshToken } = response.data;

//   // Store tokens
//   localStorage.setItem('accessToken', accessToken);
//   localStorage.setItem('refreshToken', refreshToken);

//   return response.data;
// };

export const logout = () => {
  // Clear tokens on logout
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};
