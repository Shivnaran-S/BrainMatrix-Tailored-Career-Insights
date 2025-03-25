import api from './api';

export const register = async (userData) => {
  try {
    const response = await api.post('/users/register/', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/users/login/', credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = async () => {
  try {
    await api.post('/users/logout/');
  } catch (error) {
    throw error.response.data;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/users/');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};