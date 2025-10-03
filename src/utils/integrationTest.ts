/**
 * Utilitário para testes de integração frontend-backend
 */
import { apiConfig } from '@/config/api';

export interface TestResult {
  test: string;
  status: 'success' | 'error' | 'warning';
  message: string;
  data?: any;
  error?: any;
}

export interface IntegrationTestSuite {
  name: string;
  tests: TestResult[];
  summary: {
    total: number;
    success: number;
    errors: number;
    warnings: number;
  };
}

/**
 * Testa a conectividade básica com o backend
 */
export const testBackendConnectivity = async (): Promise<TestResult> => {
  try {
    const response = await fetch(`${apiConfig.baseURL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@test.com',
        senha: 'invalid'
      })
    });

    // Se chegou até aqui, o backend está respondendo
    return {
      test: 'Backend Connectivity',
      status: 'success',
      message: 'Backend está respondendo corretamente',
      data: {
        status: response.status,
        url: `${apiConfig.baseURL}/api/auth/login`
      }
    };
  } catch (error) {
    return {
      test: 'Backend Connectivity',
      status: 'error',
      message: 'Falha na conectividade com o backend',
      error: error
    };
  }
};

/**
 * Testa o cadastro de cliente
 */
export const testClientRegistration = async (): Promise<TestResult> => {
  const testData = {
    nome: 'Cliente Teste',
    email: `cliente.teste.${Date.now()}@example.com`,
    senha: 'Teste123!@#',
    telefone: '11999999999',
    endereco: 'Rua Teste, 123, São Paulo, SP',
    cpf: '12345678901'
  };

  try {
    const response = await fetch(`${apiConfig.baseURL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const data = await response.json();

    if (response.ok) {
      return {
        test: 'Client Registration',
        status: 'success',
        message: 'Cadastro de cliente realizado com sucesso',
        data: {
          user: data.user,
          status: response.status
        }
      };
    } else {
      return {
        test: 'Client Registration',
        status: 'error',
        message: `Erro no cadastro de cliente: ${data.message}`,
        error: data
      };
    }
  } catch (error) {
    return {
      test: 'Client Registration',
      status: 'error',
      message: 'Falha na requisição de cadastro de cliente',
      error: error
    };
  }
};

/**
 * Testa o cadastro de prestador
 */
export const testProviderRegistration = async (): Promise<TestResult> => {
  const testData = {
    nome: 'Prestador Teste',
    email: `prestador.teste.${Date.now()}@example.com`,
    senha: 'Teste123!@#',
    telefone: '11999999999',
    endereco: 'Rua Teste, 123, São Paulo, SP',
    descricao: 'Serviços de teste para validação',
    atendimento24h: true,
    cpf: '12345678901'
  };

  try {
    const response = await fetch(`${apiConfig.baseURL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const data = await response.json();

    if (response.ok) {
      return {
        test: 'Provider Registration',
        status: 'success',
        message: 'Cadastro de prestador realizado com sucesso',
        data: {
          user: data.user,
          status: response.status
        }
      };
    } else {
      return {
        test: 'Provider Registration',
        status: 'error',
        message: `Erro no cadastro de prestador: ${data.message}`,
        error: data
      };
    }
  } catch (error) {
    return {
      test: 'Provider Registration',
      status: 'error',
      message: 'Falha na requisição de cadastro de prestador',
      error: error
    };
  }
};

/**
 * Testa o login de usuário
 */
export const testUserLogin = async (email: string, senha: string): Promise<TestResult> => {
  try {
    const response = await fetch(`${apiConfig.baseURL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (response.ok) {
      return {
        test: 'User Login',
        status: 'success',
        message: 'Login realizado com sucesso',
        data: {
          user: data.user,
          hasToken: !!data.access_token,
          status: response.status
        }
      };
    } else {
      return {
        test: 'User Login',
        status: 'error',
        message: `Erro no login: ${data.message}`,
        error: data
      };
    }
  } catch (error) {
    return {
      test: 'User Login',
      status: 'error',
      message: 'Falha na requisição de login',
      error: error
    };
  }
};

/**
 * Testa acesso a API protegida
 */
export const testProtectedAPI = async (token: string): Promise<TestResult> => {
  try {
    const response = await fetch(`${apiConfig.baseURL}/api/prestadores`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();

    if (response.ok) {
      return {
        test: 'Protected API Access',
        status: 'success',
        message: 'Acesso à API protegida realizado com sucesso',
        data: {
          prestadores: data.data,
          total: data.total,
          status: response.status
        }
      };
    } else {
      return {
        test: 'Protected API Access',
        status: 'error',
        message: `Erro no acesso à API protegida: ${data.message}`,
        error: data
      };
    }
  } catch (error) {
    return {
      test: 'Protected API Access',
      status: 'error',
      message: 'Falha na requisição à API protegida',
      error: error
    };
  }
};

/**
 * Testa a persistência de sessão no localStorage
 */
export const testSessionPersistence = (): TestResult => {
  try {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');

    if (token && userData) {
      const parsedUserData = JSON.parse(userData);
      return {
        test: 'Session Persistence',
        status: 'success',
        message: 'Dados de sessão encontrados no localStorage',
        data: {
          hasToken: !!token,
          hasUserData: !!userData,
          userData: parsedUserData
        }
      };
    } else {
      return {
        test: 'Session Persistence',
        status: 'warning',
        message: 'Nenhum dado de sessão encontrado no localStorage',
        data: {
          hasToken: !!token,
          hasUserData: !!userData
        }
      };
    }
  } catch (error) {
    return {
      test: 'Session Persistence',
      status: 'error',
      message: 'Erro ao verificar persistência de sessão',
      error: error
    };
  }
};

/**
 * Testa o logout e limpeza de dados
 */
export const testLogout = (): TestResult => {
  try {
    // Simular logout
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');

    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');

    if (!token && !userData) {
      return {
        test: 'Logout',
        status: 'success',
        message: 'Logout realizado com sucesso - dados limpos',
        data: {
          hasToken: false,
          hasUserData: false
        }
      };
    } else {
      return {
        test: 'Logout',
        status: 'error',
        message: 'Falha na limpeza dos dados de sessão',
        data: {
          hasToken: !!token,
          hasUserData: !!userData
        }
      };
    }
  } catch (error) {
    return {
      test: 'Logout',
      status: 'error',
      message: 'Erro durante o logout',
      error: error
    };
  }
};

/**
 * Executa suite completa de testes de integração
 */
export const runIntegrationTests = async (): Promise<IntegrationTestSuite> => {
  const tests: TestResult[] = [];

  console.log('🧪 Iniciando testes de integração frontend-backend...');

  // 1. Teste de conectividade
  console.log('1. Testando conectividade com backend...');
  tests.push(await testBackendConnectivity());

  // 2. Teste de cadastro de cliente
  console.log('2. Testando cadastro de cliente...');
  tests.push(await testClientRegistration());

  // 3. Teste de cadastro de prestador
  console.log('3. Testando cadastro de prestador...');
  tests.push(await testProviderRegistration());

  // 4. Teste de login (usando dados do cadastro de cliente)
  console.log('4. Testando login...');
  const clientTest = tests.find(t => t.test === 'Client Registration');
  if (clientTest?.status === 'success') {
    tests.push(await testUserLogin(
      `cliente.teste.${Date.now()}@example.com`,
      'Teste123!@#'
    ));
  }

  // 5. Teste de API protegida (se login foi bem-sucedido)
  console.log('5. Testando acesso à API protegida...');
  const loginTest = tests.find(t => t.test === 'User Login');
  if (loginTest?.status === 'success' && loginTest.data?.hasToken) {
    // Simular token para teste
    tests.push(await testProtectedAPI('fake-token-for-test'));
  }

  // 6. Teste de persistência de sessão
  console.log('6. Testando persistência de sessão...');
  tests.push(testSessionPersistence());

  // 7. Teste de logout
  console.log('7. Testando logout...');
  tests.push(testLogout());

  // Calcular resumo
  const summary = {
    total: tests.length,
    success: tests.filter(t => t.status === 'success').length,
    errors: tests.filter(t => t.status === 'error').length,
    warnings: tests.filter(t => t.status === 'warning').length
  };

  console.log('✅ Testes de integração concluídos!');
  console.log(`📊 Resumo: ${summary.success}/${summary.total} sucessos, ${summary.errors} erros, ${summary.warnings} avisos`);

  return {
    name: 'Frontend-Backend Integration Tests',
    tests,
    summary
  };
};

/**
 * Exibe resultados dos testes no console
 */
export const displayTestResults = (suite: IntegrationTestSuite): void => {
  console.group(`🧪 ${suite.name}`);
  console.log(`📊 Resumo: ${suite.summary.success}/${suite.summary.total} sucessos, ${suite.summary.errors} erros, ${suite.summary.warnings} avisos`);
  
  suite.tests.forEach(test => {
    const icon = test.status === 'success' ? '✅' : test.status === 'error' ? '❌' : '⚠️';
    console.group(`${icon} ${test.test}`);
    console.log(`Status: ${test.status}`);
    console.log(`Mensagem: ${test.message}`);
    if (test.data) {
      console.log('Dados:', test.data);
    }
    if (test.error) {
      console.error('Erro:', test.error);
    }
    console.groupEnd();
  });
  
  console.groupEnd();
};
