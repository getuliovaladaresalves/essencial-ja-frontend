import React from 'react';
import IntegrationTestPanel from '@/components/IntegrationTestPanel';

const IntegrationTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Testes de Integração
          </h1>
          <p className="text-muted-foreground">
            Validação completa da integração entre frontend e backend
          </p>
        </div>
        
        <IntegrationTestPanel />
      </div>
    </div>
  );
};

export default IntegrationTest;
