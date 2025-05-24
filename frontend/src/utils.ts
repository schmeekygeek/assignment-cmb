import api from './api';

export const isLoggedIn = async ():Promise<boolean> => {
  try {
    const res = await api.get('/user/checkauth', {
      withCredentials: true,
    });
    return res.status === 200;
  } catch {
    return false;
  }
}
