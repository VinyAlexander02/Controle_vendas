import { get } from '../baseService';

export const isAuthenticated = async () => {
  const token = localStorage.getItem('TOKEN_KEY');
  const response = await get('http://localhost:3333/session');

  if (token && response.success) {
    return response;
  }

  return false;
};
