// Serviço de API para integração com backend
const API_BASE_URL = 'http://localhost:3000';

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  message: string;
  access_token: string;
  user: {
    id: string;
    nome: string;
    email: string;
    criadoEm: string;
  };
}

export interface Prestador {
  id: string;
  fotoUrl?: string;
  descricao?: string;
  disponivel: boolean;
  user: {
    id: string;
    nome: string;
    email: string;
    criadoEm: string;
  };
  servicos: Array<{
    id: string;
    nome: string;
    categoria: {
      id: string;
      nome: string;
    };
  }>;
}

export interface PrestadoresResponse {
  message: string;
  data: Prestador[];
  total: number;
}

class ApiService {
  private token: string | null = null;

  // Armazenar token
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  // Recuperar token
  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('auth_token');
    }
    return this.token;
  }

  // Limpar token
  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Headers padrão
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  // Login
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro no login');
    }

    const data = await response.json();
    this.setToken(data.access_token);
    return data;
  }

  // Listar prestadores
  async getPrestadores(): Promise<PrestadoresResponse> {
    const response = await fetch(`${API_BASE_URL}/prestadores`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao buscar prestadores');
    }

    return await response.json();
  }

  // Buscar prestador por ID
  async getPrestadorById(id: string): Promise<{ message: string; data: Prestador }> {
    const response = await fetch(`${API_BASE_URL}/prestadores/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao buscar prestador');
    }

    return await response.json();
  }

  // Buscar prestadores por serviço
  async getPrestadoresByServico(servicoId: string): Promise<PrestadoresResponse> {
    const response = await fetch(`${API_BASE_URL}/prestadores/servico/${servicoId}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao buscar prestadores por serviço');
    }

    return await response.json();
  }

  // Verificar se está logado
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Logout
  logout() {
    this.clearToken();
  }
}

// Instância única do serviço
export const apiService = new ApiService();
export default apiService;
