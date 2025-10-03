import React from 'react';
import { useModal } from '@/contexts/ModalContext';
import LoginModal from './LoginModal';
import LocationSelector from './LocationSelector';
import ProfileMenu from './ProfileMenu';
import ConfirmacaoModal from './ConfirmacaoModal';
import EntradaParceiroModal from './EntradaParceiroModal';

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
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Cadastro de Prestador
              </h2>
              <p className="text-muted-foreground mb-6">
                Modal de cadastro de prestador será implementado aqui.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => navigateToModal('loginProvider')}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors"
                >
                  Já tenho conta
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      );

    case 'loginClient':
      return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Login de Cliente
              </h2>
              <p className="text-muted-foreground mb-6">
                Modal de login de cliente será implementado aqui.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => navigateToModal('registerClient')}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors"
                >
                  Criar conta
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      );

    case 'registerClient':
      return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Cadastro de Cliente
              </h2>
              <p className="text-muted-foreground mb-6">
                Modal de cadastro de cliente será implementado aqui.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => navigateToModal('loginClient')}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors"
                >
                  Já tenho conta
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
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
                Modal de emergência será implementado aqui.
              </p>
              <div className="flex gap-4">
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
