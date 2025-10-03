import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSignInAlt, faUserPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';

interface EntradaParceiroModalProps {
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

const EntradaParceiroModal: React.FC<EntradaParceiroModalProps> = ({ 
  onClose, 
  onLogin, 
  onRegister 
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative p-6 pb-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
          </button>
          
          <h1 className="text-2xl font-bold text-foreground text-center mb-6">
            Área do Parceiro Essencial Já
          </h1>
        </div>

        {/* Conteúdo Principal */}
        <div className="px-6 pb-6">
          {/* Lista de Vantagens */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4 text-center">
              Vantagens de ser nosso parceiro:
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FontAwesomeIcon 
                  icon={faCheck} 
                  className="text-success mt-1 flex-shrink-0" 
                />
                <span className="text-foreground">
                  Receba clientes prontos para o serviço.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon 
                  icon={faCheck} 
                  className="text-success mt-1 flex-shrink-0" 
                />
                <span className="text-foreground">
                  Pagamento rápido e seguro via Pix.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon 
                  icon={faCheck} 
                  className="text-success mt-1 flex-shrink-0" 
                />
                <span className="text-foreground">
                  Sem taxas de adesão ou mensalidades.
                </span>
              </li>
            </ul>
          </div>

          {/* Botões de Ação */}
          <div className="space-y-3">
            {/* Botão Principal - Login */}
            <Button
              onClick={onLogin}
              className="w-full bg-primary hover:bg-primary-hover text-primary-foreground py-3 rounded-lg font-semibold text-base transition-colors"
            >
              <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
              Já tenho conta, fazer login
            </Button>

            {/* Botão Secundário - Cadastro */}
            <Button
              onClick={onRegister}
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary/5 py-3 rounded-lg font-semibold text-base transition-colors"
            >
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Quero ser um parceiro
            </Button>
          </div>

          {/* Texto de Apoio */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Junte-se a milhares de prestadores que já trabalham conosco
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntradaParceiroModal;
