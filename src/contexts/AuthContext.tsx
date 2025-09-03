import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  user: { username: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Credentials simples pour la démo (à remplacer par une vraie authentification)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'lscom2025'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const savedAuth = localStorage.getItem('admin_auth');
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      if (authData.isAuthenticated && authData.user) {
        setIsAuthenticated(true);
        setUser(authData.user);
      }
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      setUser({ username });
      localStorage.setItem('admin_auth', JSON.stringify({
        isAuthenticated: true,
        user: { username }
      }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('admin_auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};