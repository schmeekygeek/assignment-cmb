import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import api from "@/api"

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/user/checkauth', { withCredentials: true },);
        setIsLoggedIn(res.status === 200);
      } catch {
        setIsLoggedIn(false);
      }
    })();
  }, []);

  const login = async () => {
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await api.get('/user/logout', { withCredentials: true },);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
