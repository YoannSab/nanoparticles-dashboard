import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Vérifier l'état d'authentification au chargement
    const checkAuth = async () => {
      const storedPassword = localStorage.getItem('app_password');
      if (storedPassword) {
        const expectedHash = 'c956bdd0bc06cb6bcf0ea845b90498f2c2adbbeef9cab3d16ec66f3798bf70d3';
        const storedHash = await calculateSHA256(storedPassword);
        if (storedHash === expectedHash) {
          setIsAuthenticated(true);
        } else {
          // Mot de passe stocké invalide, nettoyer
          localStorage.removeItem('app_password');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Fonction pour calculer le hash SHA-256
  const calculateSHA256 = async (text) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  const login = () => {
    setIsAuthenticated(true);
  };
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('app_password');
  };

  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
