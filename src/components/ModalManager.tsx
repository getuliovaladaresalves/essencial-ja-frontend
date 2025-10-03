import React from 'react';
import { useModal } from '@/contexts/ModalContext';
import LoginModal from './LoginModal';
import LocationSelector from './LocationSelector';
import ProfileMenu from './ProfileMenu';
import ConfirmacaoModal from './ConfirmacaoModal';
import EntradaParceiroModal from './EntradaParceiroModal';
import RegisterProviderModal from './RegisterProviderModal';
import RegisterClientModal from './RegisterClientModal';

// Importar os modais existentes (serão refatorados para usar o contexto)
// Por enquanto, vamos criar placeholders que serão substituídos

const ModalManager: React.FC = () => {
  const { activeModal, modalProps, closeModal } = useModal();

  if (!activeModal) return null;

  // Função para fechar modal e navegar para outro
  const navigateToModal = (newModal: string, props: Record<string, any> = {}) => {
    const { showModal } = useModal();
    showModal(newModal, props);
  };

  switch (activeModal) {
    case 'entradaParceiro':
      return (
        <EntradaParceiroModal
          onClose={closeModal}
        />
      );

    case 'login':
    case 'loginProvider':
      return (
        <LoginModal
          isOpen={true}
          onClose={closeModal}
          onLoginSuccess={modalProps.onLoginSuccess}
          flow={modalProps.flow || 'client'}
        />
      );

    case 'registerProvider':
      return (
        <RegisterProviderModal
          onClose={closeModal}
        />
      );

    case 'loginClient':
      return (
        <LoginModal
          isOpen={true}
          onClose={closeModal}
          onLoginSuccess={modalProps.onLoginSuccess}
          flow={modalProps.flow || 'client'}
        />
      );

    case 'registerClient':
      return (
        <RegisterClientModal
          onClose={closeModal}
        />
      );

    case 'emergency':
      return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-destructive mb-4">
                🚨 SOS EMERGÊNCIA
              </h2>
              <p className="text-muted-foreground mb-6">
                Selecione o tipo de serviço de emergência que você precisa. Mostraremos os prestadores disponíveis 24h.
              </p>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Qual tipo de emergência você está enfrentando?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      // Simular seleção de categoria de emergência
                      alert('Funcionalidade de emergência será implementada em breve!');
                      closeModal();
                    }}
                    className="p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl text-primary group-hover:text-primary-hover transition-colors">
                        🔧
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Encanador</h4>
                        <p className="text-sm text-muted-foreground">Vazamentos, entupimentos e reparos urgentes</p>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => {
                      alert('Funcionalidade de emergência será implementada em breve!');
                      closeModal();
                    }}
                    className="p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl text-primary group-hover:text-primary-hover transition-colors">
                        ⚡
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Eletricista</h4>
                        <p className="text-sm text-muted-foreground">Falhas elétricas e reparos urgentes</p>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => {
                      alert('Funcionalidade de emergência será implementada em breve!');
                      closeModal();
                    }}
                    className="p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl text-primary group-hover:text-primary-hover transition-colors">
                        🔑
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Chaveiro</h4>
                        <p className="text-sm text-muted-foreground">Fechaduras, chaves perdidas e abertura de portas</p>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => {
                      alert('Funcionalidade de emergência será implementada em breve!');
                      closeModal();
                    }}
                    className="p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl text-primary group-hover:text-primary-hover transition-colors">
                        🚗
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Borracharia</h4>
                        <p className="text-sm text-muted-foreground">Pneus furados e reparos automotivos urgentes</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
              <div className="flex gap-4 pt-6">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      );

    case 'confirmacao':
      return (
        <ConfirmacaoModal
          prestador={modalProps.prestador}
          onClose={closeModal}
          onConfirm={() => {
            closeModal();
            // A transição para tracking será feita no componente pai
            if (modalProps.onConfirm) {
              modalProps.onConfirm();
            }
          }}
        />
      );

    default:
      console.warn(`Modal desconhecido: ${activeModal}`);
      return null;
  }
};

export default ModalManager;
