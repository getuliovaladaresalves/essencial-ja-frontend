# 🔗 Integração Frontend React + API Essencial Já

## 🎯 **Status Atual**

### ✅ **Backend (API) - FUNCIONANDO**
- **URL**: http://localhost:3000
- **Autenticação**: JWT implementada
- **Endpoints**: Todos funcionando
- **Banco de dados**: Populado com dados de exemplo
- **CORS**: Configurado para frontend

### ✅ **Frontend (React) - FUNCIONANDO**
- **URL**: http://localhost:8081
- **Framework**: React + Vite + TypeScript
- **UI**: Tailwind CSS + shadcn/ui
- **Estado**: Gerenciado com useState/useEffect

## 🔧 **Próximos Passos para Integração**

### **1. Configurar Variáveis de Ambiente no Frontend**

Criar arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Essencial Já
```

### **2. Instalar Dependências para API**

```bash
# No diretório raiz do projeto
npm install axios
```

### **3. Criar Serviços de API**

#### **3.1 Configuração do Axios**

Criar `src/services/api.ts`:

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

#### **3.2 Serviço de Autenticação**

Criar `src/services/auth.ts`:

```typescript
import api from './api';

export interface LoginData {
  email: string;
  senha: string;
}

export interface RegisterData {
  nome: string;
  email: string;
  senha: string;
}

export interface User {
  id: string;
  nome: string;
  email: string;
  criadoEm: string;
}

export interface AuthResponse {
  message: string;
  access_token: string;
  user: User;
}

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};
```

#### **3.3 Serviço de Prestadores**

Criar `src/services/prestadores.ts`:

```typescript
import api from './api';

export interface Servico {
  id: string;
  nome: string;
  categoria: {
    id: string;
    nome: string;
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
  servicos: Servico[];
}

export interface PrestadoresResponse {
  message: string;
  data: Prestador[];
  total: number;
}

export const prestadoresService = {
  async getAll(): Promise<PrestadoresResponse> {
    const response = await api.get('/prestadores');
    return response.data;
  },

  async getById(id: string): Promise<{ message: string; data: Prestador }> {
    const response = await api.get(`/prestadores/${id}`);
    return response.data;
  },

  async getByServico(servicoId: string): Promise<PrestadoresResponse> {
    const response = await api.get(`/prestadores/servico/${servicoId}`);
    return response.data;
  }
};
```

### **4. Atualizar Componentes do Frontend**

#### **4.1 Atualizar Login Modal**

Modificar `src/pages/Index.tsx` - CustomerLoginModal:

```typescript
// Adicionar import
import { authService } from '../services/auth';

// Modificar handleCustomerLoginSubmit
const handleCustomerLoginSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const response = await authService.login({
      email: loginData.email,
      senha: loginData.senha
    });
    
    // Salvar token e dados do usuário
    localStorage.setItem('token', response.access_token);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    // Atualizar estado
    setIsLoggedIn(true);
    setUserType('customer');
    setUserData(response.user);
    setIsCustomerLoginOpen(false);
    
    // Limpar formulário
    setLoginData({ email: '', senha: '' });
    
  } catch (error) {
    console.error('Erro no login:', error);
    // Mostrar mensagem de erro para o usuário
  }
};
```

#### **4.2 Atualizar Lista de Prestadores**

Modificar a lógica de carregamento de prestadores:

```typescript
// Adicionar import
import { prestadoresService } from '../services/prestadores';

// Adicionar estado para prestadores da API
const [prestadoresAPI, setPrestadoresAPI] = useState<Prestador[]>([]);
const [loadingAPI, setLoadingAPI] = useState(false);

// Função para carregar prestadores da API
const carregarPrestadoresAPI = async () => {
  setLoadingAPI(true);
  try {
    const response = await prestadoresService.getAll();
    setPrestadoresAPI(response.data);
  } catch (error) {
    console.error('Erro ao carregar prestadores:', error);
  } finally {
    setLoadingAPI(false);
  }
};

// Carregar prestadores quando usuário fizer login
useEffect(() => {
  if (isLoggedIn && userType === 'customer') {
    carregarPrestadoresAPI();
  }
}, [isLoggedIn, userType]);
```

#### **4.3 Atualizar Renderização de Prestadores**

Modificar a seção de prestadores para usar dados da API:

```typescript
// Na seção de prestadores, substituir mockData por prestadoresAPI
{loadingAPI ? (
  <div className="text-center py-8">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
    <p className="text-muted-foreground">Carregando prestadores...</p>
  </div>
) : (
  prestadoresAPI.map((provider) => (
    <ProviderCard
      key={provider.id}
      provider={provider}
      isSelected={selectedProvider?.id === provider.id}
    />
  ))
)}
```

### **5. Atualizar ProviderCard para Dados da API**

Modificar o componente ProviderCard para trabalhar com dados da API:

```typescript
// Atualizar interface Provider para incluir campos da API
interface Provider {
  id: string;
  nome: string;
  categoria: string;
  avaliacao: number;
  tempoChegada: string;
  preco: string;
  seloEssencial: boolean;
  aberto24h: boolean;
  parceiroPro: boolean;
  descricao?: string;
  endereco: {
    texto: string;
    urlMapaEmbed: string;
  };
  foto: string;
  // Campos da API
  fotoUrl?: string;
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
```

### **6. Configurar CORS no Backend**

Verificar se o CORS está configurado corretamente no `src/main.ts`:

```typescript
app.enableCors({
  origin: [
    'http://localhost:3000',
    'http://localhost:8080', 
    'http://localhost:8081',
    'http://localhost:5173' // Vite default
  ],
  credentials: true,
});
```

## 🧪 **Teste da Integração**

### **1. Iniciar Ambos os Serviços**

```bash
# Terminal 1 - API
cd api
npm run start:dev

# Terminal 2 - Frontend  
cd .
npm run dev
```

### **2. Testar Fluxo Completo**

1. **Acessar frontend**: http://localhost:8081
2. **Fazer login** com `cliente@teste.com` / `123456`
3. **Verificar** se prestadores carregam da API
4. **Testar** funcionalidades de busca e filtro
5. **Verificar** se dados são consistentes

## 🎯 **Resultado Esperado**

✅ **Frontend conectado** à API  
✅ **Autenticação funcionando** com JWT  
✅ **Prestadores carregando** da API  
✅ **Dados consistentes** entre frontend e backend  
✅ **Funcionalidades preservadas** do frontend  
✅ **Performance otimizada** com cache local  

## 📝 **Próximos Passos**

1. **Implementar cache** para dados de prestadores
2. **Adicionar loading states** durante carregamento
3. **Implementar error handling** para falhas de API
4. **Adicionar refresh token** para sessões longas
5. **Implementar paginação** para grandes volumes de dados

---

**🚀 Integração Frontend + API pronta para implementação!**
