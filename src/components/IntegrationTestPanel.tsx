import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, 
  faCheckCircle, 
  faTimesCircle, 
  faExclamationTriangle,
  faSpinner,
  faCode,
  faDatabase,
  faUser,
  faShield,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { runIntegrationTests, displayTestResults, IntegrationTestSuite, TestResult } from '@/utils/integrationTest';

const IntegrationTestPanel: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<IntegrationTestSuite | null>(null);

  const handleRunTests = async () => {
    setIsRunning(true);
    setTestResults(null);

    try {
      const results = await runIntegrationTests();
      setTestResults(results);
      displayTestResults(results);
    } catch (error) {
      console.error('Erro ao executar testes:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />;
      case 'error':
        return <FontAwesomeIcon icon={faTimesCircle} className="text-red-500" />;
      case 'warning':
        return <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <Badge variant="default" className="bg-green-500">Sucesso</Badge>;
      case 'error':
        return <Badge variant="destructive">Erro</Badge>;
      case 'warning':
        return <Badge variant="secondary" className="bg-yellow-500">Aviso</Badge>;
      default:
        return null;
    }
  };

  const getTestIcon = (testName: string) => {
    if (testName.includes('Connectivity')) return <FontAwesomeIcon icon={faDatabase} />;
    if (testName.includes('Registration')) return <FontAwesomeIcon icon={faUser} />;
    if (testName.includes('Login')) return <FontAwesomeIcon icon={faShield} />;
    if (testName.includes('Protected')) return <FontAwesomeIcon icon={faShield} />;
    if (testName.includes('Session')) return <FontAwesomeIcon icon={faDatabase} />;
    if (testName.includes('Logout')) return <FontAwesomeIcon icon={faSignOutAlt} />;
    return <FontAwesomeIcon icon={faCode} />;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCode} className="text-primary" />
            Testes de Integração Frontend-Backend
          </CardTitle>
          <p className="text-muted-foreground">
            Validação completa da integração entre frontend e backend, incluindo cadastros, autenticação e acessos.
          </p>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleRunTests} 
            disabled={isRunning}
            className="w-full"
          >
            {isRunning ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="mr-2 animate-spin" />
                Executando Testes...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faPlay} className="mr-2" />
                Executar Testes de Integração
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {testResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Resultados dos Testes</span>
              <div className="flex gap-2">
                <Badge variant="default" className="bg-green-500">
                  {testResults.summary.success} Sucessos
                </Badge>
                <Badge variant="destructive">
                  {testResults.summary.errors} Erros
                </Badge>
                <Badge variant="secondary" className="bg-yellow-500">
                  {testResults.summary.warnings} Avisos
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testResults.tests.map((test, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getTestIcon(test.test)}
                      <span className="font-medium">{test.test}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(test.status)}
                      {getStatusBadge(test.status)}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {test.message}
                  </p>

                  {test.data && (
                    <details className="mt-2">
                      <summary className="text-sm font-medium cursor-pointer hover:text-primary">
                        Ver Dados
                      </summary>
                      <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto">
                        {JSON.stringify(test.data, null, 2)}
                      </pre>
                    </details>
                  )}

                  {test.error && (
                    <details className="mt-2">
                      <summary className="text-sm font-medium cursor-pointer hover:text-destructive">
                        Ver Erro
                      </summary>
                      <pre className="mt-2 p-2 bg-destructive/10 rounded text-xs overflow-auto text-destructive">
                        {JSON.stringify(test.error, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Testes Incluídos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <FontAwesomeIcon icon={faDatabase} className="text-blue-500" />
                Conectividade
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Teste de conectividade com backend</li>
                <li>• Validação de endpoints</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} className="text-green-500" />
                Cadastros
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Cadastro de clientes</li>
                <li>• Cadastro de prestadores</li>
                <li>• Validação de dados</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <FontAwesomeIcon icon={faShield} className="text-purple-500" />
                Autenticação
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Login de usuários</li>
                <li>• Geração de JWT</li>
                <li>• Acesso a APIs protegidas</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <FontAwesomeIcon icon={faSignOutAlt} className="text-orange-500" />
                Sessão
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Persistência no localStorage</li>
                <li>• Logout e limpeza</li>
                <li>• Validação de tokens</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationTestPanel;
