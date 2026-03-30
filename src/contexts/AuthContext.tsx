'use client'

import { createContext, useState, useEffect, useContext } from 'react';

interface AuthContextData {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null; // Adicionado!
  user: { id: number } | null; // Adicionado simplificado (só o ID que precisamos)
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Guardando o token e o user no estado
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: number } | null>(null);

  useEffect(() => {
    // Pegando o token do seu LocalStorage
    const savedToken = localStorage.getItem('auth_token');

    if (savedToken) {
      setIsAuthenticated(true);
      setToken(savedToken);
      
      // MOCK: Como você só precisa do ID do usuário por enquanto, 
      // vou chumbar o ID 1. No futuro, você pode decodificar o JWT aqui!
      setUser({ id: 1 }); 
    } else {
      setIsAuthenticated(false);
      setToken(null);
      setUser(null);
    }

    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, token, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);