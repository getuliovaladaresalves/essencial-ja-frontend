import { useState, useEffect } from 'react';
import { apiService, Prestador, PrestadoresResponse } from '../services/api';

export interface UsePrestadoresState {
  prestadores: Prestador[];
  loading: boolean;
  error: string | null;
  total: number;
}

export const usePrestadores = () => {
  const [state, setState] = useState<UsePrestadoresState>({
    prestadores: [],
    loading: false,
    error: null,
    total: 0,
  });

  const fetchPrestadores = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await apiService.getPrestadores();
      setState({
        prestadores: response.data,
        loading: false,
        error: null,
        total: response.total,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      }));
    }
  };

  const fetchPrestadorById = async (id: string): Promise<Prestador | null> => {
    try {
      const response = await apiService.getPrestadorById(id);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar prestador:', error);
      return null;
    }
  };

  const fetchPrestadoresByServico = async (servicoId: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await apiService.getPrestadoresByServico(servicoId);
      setState({
        prestadores: response.data,
        loading: false,
        error: null,
        total: response.total,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      }));
    }
  };

  // Carregar prestadores automaticamente
  useEffect(() => {
    if (apiService.isLoggedIn()) {
      fetchPrestadores();
    }
  }, []);

  return {
    ...state,
    fetchPrestadores,
    fetchPrestadorById,
    fetchPrestadoresByServico,
    refetch: fetchPrestadores,
  };
};
