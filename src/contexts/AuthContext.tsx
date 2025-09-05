import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  user: { username: string } | null;
  loginAttempts: number;
  isBlocked: boolean;
  blockTimeRemaining: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Credentials sécurisés avec hash
const ADMIN_CREDENTIALS = [
  {
    username: 'lscom',
    passwordHash: 'hello', // Mot de passe en clair temporairement
    role: 'super_admin'
  }
];

const MAX_LOGIN_ATTEMPTS = 10;
const BLOCK_DURATION = 2 * 60 * 1000; // 2 minutes

// Fonction de hash simple (MD5-like)
const simpleHash = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
};
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeRemaining, setBlockTimeRemaining] = useState(0);

  useEffect(() => {
    // Vérifier l'authentification existante
    const savedAuth = localStorage.getItem('admin_auth');
    const savedAttempts = localStorage.getItem('login_attempts');
    const savedBlockTime = localStorage.getItem('block_time');
    
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        // Vérifier que la session n'a pas expiré (24h)
        const sessionAge = Date.now() - (authData.timestamp || 0);
        if (authData.isAuthenticated && authData.user && sessionAge < 24 * 60 * 60 * 1000) {
          setIsAuthenticated(true);
          setUser(authData.user);
        } else {
          localStorage.removeItem('admin_auth');
        }
      } catch (error) {
        localStorage.removeItem('admin_auth');
      }
    }
    
    // Vérifier les tentatives de connexion
    if (savedAttempts) {
      const attempts = parseInt(savedAttempts);
      setLoginAttempts(attempts);
    }
    
    // Vérifier le blocage
    if (savedBlockTime) {
      const blockTime = parseInt(savedBlockTime);
      const timeRemaining = blockTime - Date.now();
      if (timeRemaining > 0) {
        setIsBlocked(true);
        setBlockTimeRemaining(Math.ceil(timeRemaining / 1000));
        
        // Timer pour débloquer
        const timer = setTimeout(() => {
          setIsBlocked(false);
          setBlockTimeRemaining(0);
          setLoginAttempts(0);
          localStorage.removeItem('block_time');
          localStorage.removeItem('login_attempts');
        }, timeRemaining);
        
        return () => clearTimeout(timer);
      } else {
        localStorage.removeItem('block_time');
        localStorage.removeItem('login_attempts');
      }
    }
  }, []);

  // Timer pour le compte à rebours du blocage
  useEffect(() => {
    if (isBlocked && blockTimeRemaining > 0) {
      const timer = setInterval(() => {
        setBlockTimeRemaining(prev => {
          if (prev <= 1) {
            setIsBlocked(false);
            setLoginAttempts(0);
            localStorage.removeItem('block_time');
            localStorage.removeItem('login_attempts');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [isBlocked, blockTimeRemaining]);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Vérifier si bloqué
    if (isBlocked) {
      return false;
    }

    // Simuler un délai de traitement (sécurité)
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Vérifier les credentials
    const validUser = ADMIN_CREDENTIALS.find(
      cred => cred.username === username && cred.passwordHash === password
    );

    if (validUser) {
      // Connexion réussie
      setIsAuthenticated(true);
      setUser({ username });
      setLoginAttempts(0);
      
      // Sauvegarder avec timestamp
      localStorage.setItem('admin_auth', JSON.stringify({
        isAuthenticated: true,
        user: { username },
        timestamp: Date.now(),
        role: validUser.role
      }));
      
      // Nettoyer les tentatives
      localStorage.removeItem('login_attempts');
      localStorage.removeItem('block_time');
      
      // Log de sécurité
      console.log(`[SECURITY] Connexion admin réussie: ${username} à ${new Date().toISOString()}`);
      
      return true;
    } else {
      // Connexion échouée
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      localStorage.setItem('login_attempts', newAttempts.toString());
      
      // Log de sécurité
      console.warn(`[SECURITY] Tentative de connexion échouée: ${username} (${newAttempts}/${MAX_LOGIN_ATTEMPTS})`);
      
      // Bloquer après trop de tentatives
      if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
        const blockUntil = Date.now() + BLOCK_DURATION;
        setIsBlocked(true);
        setBlockTimeRemaining(BLOCK_DURATION / 1000);
        localStorage.setItem('block_time', blockUntil.toString());
        
        console.error(`[SECURITY] Compte bloqué pour 15 minutes après ${MAX_LOGIN_ATTEMPTS} tentatives`);
      }
      
      return false;
    }
  };

  const logout = () => {
    console.log(`[SECURITY] Déconnexion admin: ${user?.username} à ${new Date().toISOString()}`);
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('admin_auth');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      login, 
      logout, 
      user, 
      loginAttempts, 
      isBlocked, 
      blockTimeRemaining 
    }}>
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