import { clearJwt, storeJwt, isLoggedIn as loginStatus } from '@/utils';
import { createContext, useContext, useState, type ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (jwt: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return !!loginStatus();
  });

  const login = (jwt: string) => {
    storeJwt(jwt)
    return setIsLoggedIn(true)
  }
  const logout = () => {
    clearJwt()
    return setIsLoggedIn(false)
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
