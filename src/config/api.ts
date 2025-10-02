// Configuração da API para diferentes ambientes
const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:3000',
    timeout: 10000,
  },
  production: {
    baseURL: process.env.REACT_APP_API_URL || 'https://essencial-ja-api.vercel.app',
    timeout: 15000,
  },
  vercel: {
    baseURL: process.env.REACT_APP_API_URL || 'https://essencial-ja-api.vercel.app',
    timeout: 15000,
  }
};

// Determinar ambiente
const getEnvironment = (): keyof typeof API_CONFIG => {
  if (process.env.NODE_ENV === 'production') {
    if (process.env.REACT_APP_DEPLOY_TARGET === 'vercel') {
      return 'vercel';
    }
    return 'production';
  }
  return 'development';
};

// Configuração atual
export const apiConfig = API_CONFIG[getEnvironment()];

// URLs dos endpoints
export const API_ENDPOINTS = {
  // Autenticação
  auth: {
    login: `${apiConfig.baseURL}/api/auth/login`,
    register: `${apiConfig.baseURL}/api/auth/register`,
  },
  
  // Prestadores
  prestadores: {
    list: `${apiConfig.baseURL}/api/prestadores`,
    byId: (id: string) => `${apiConfig.baseURL}/api/prestadores/${id}`,
    byServico: (servicoId: string) => `${apiConfig.baseURL}/api/prestadores/servico/${servicoId}`,
  }
};

// Configuração de headers padrão
export const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// Configuração de timeout
export const requestTimeout = apiConfig.timeout;

// Função para criar headers com autenticação
export const createAuthHeaders = (token: string) => ({
  ...defaultHeaders,
  'Authorization': `Bearer ${token}`,
});

// Função para verificar se a API está disponível
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${apiConfig.baseURL}/api/health`, {
      method: 'GET',
      headers: defaultHeaders,
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch (error) {
    console.warn('API health check failed:', error);
    return false;
  }
};

// Função para fazer requisições com retry
export const fetchWithRetry = async (
  url: string,
  options: RequestInit = {},
  maxRetries: number = 3
): Promise<Response> => {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(requestTimeout),
      });
      
      if (response.ok) {
        return response;
      }
      
      // Se for erro 4xx, não tentar novamente
      if (response.status >= 400 && response.status < 500) {
        throw new Error(`Client error: ${response.status}`);
      }
      
      throw new Error(`Server error: ${response.status}`);
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxRetries) {
        throw lastError;
      }
      
      // Aguardar antes da próxima tentativa
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
  
  throw lastError!;
};

export default apiConfig;
