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

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  return date.toLocaleDateString("en-US", options)
}
