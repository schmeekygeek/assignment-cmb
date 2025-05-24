import api from './api';

export async function isLoggedIn(): Promise<boolean> {
  try {
    const res = await api.get('/user/checkauth', {
      withCredentials: true,
    });

    return res.status === 200;
  } catch {
    return false;
  }
}
