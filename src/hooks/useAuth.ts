import { useState, useEffect } from 'react';
import { apiService, LoginRequest, LoginResponse } from '../services/api';

export interface User {
  id: string;
  nome: string;
  email: string;
  criadoEm: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
    token: null,
    loading: true,
  });

  // Verificar autenticação ao carregar
  useEffect(() => {
    const token = apiService.getToken();
    if (token) {
      // Aqui você poderia validar o token com o backend
      // Por simplicidade, assumimos que se existe, é válido
      setAuthState({
        isLoggedIn: true,
        user: null, // Seria carregado do token ou do backend
        token,
        loading: false,
      });
    } else {
      setAuthState({
        isLoggedIn: false,
        user: null,
        token: null,
        loading: false,
      });
    }
  }, []);

  const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await apiService.login(credentials);
      
      setAuthState({
        isLoggedIn: true,
        user: response.user,
        token: response.access_token,
        loading: false,
      });

      return response;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
      }));
      throw error;
    }
  };

  const logout = () => {
    apiService.logout();
    setAuthState({
      isLoggedIn: false,
      user: null,
      token: null,
      loading: false,
    });
  };

  return {
    ...authState,
    login,
    logout,
  };
};
