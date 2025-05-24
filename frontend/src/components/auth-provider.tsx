import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import api from "@/api";
import { isLoggedIn as checkLogin } from '../utils';
import { Loader } from 'lucide-react';

interface AuthContextType {
  isLoggedIn: boolean | undefined;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const loginStatus = await checkLogin();
        setIsLoggedIn(loginStatus);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const login = async () => {
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await api.get('/user/logout', { withCredentials: true });
    setIsLoggedIn(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin w-6 h-6" />
      </div>
    );
  }

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
