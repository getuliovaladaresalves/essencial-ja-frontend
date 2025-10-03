import { useModal } from '@/contexts/ModalContext';

/**
 * Hook para verificar autenticação e redirecionar para login se necessário
 */
export const useAuthGuard = () => {
  const { showModal } = useModal();

  /**
   * Verifica se o usuário está logado
   */
  const isLoggedIn = (): boolean => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    return !!(token && userData);
  };

  /**
   * Executa uma ação se o usuário estiver logado, senão abre o modal de login
   */
  const requireAuth = (action: () => void, flow: 'client' | 'partner' = 'client') => {
    if (isLoggedIn()) {
      action();
    } else {
      showModal('login', { flow });
    }
  };

  /**
   * Wrapper para botões que requerem autenticação
   */
  const withAuthGuard = (action: () => void, flow: 'client' | 'partner' = 'client') => {
    return () => requireAuth(action, flow);
  };

  return {
    isLoggedIn,
    requireAuth,
    withAuthGuard
  };
};
