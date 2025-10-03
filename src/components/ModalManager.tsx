import React, { useState } from 'react';
import { useModal } from '@/contexts/ModalContext';
import LoginModal from './LoginModal';
import LocationSelector from './LocationSelector';
import ProfileMenu from './ProfileMenu';
import ConfirmacaoModal from './ConfirmacaoModal';
import EntradaParceiroModal from './EntradaParceiroModal';
import RegisterProviderModal from './RegisterProviderModal';
import RegisterClientModal from './RegisterClientModal';
import EmergenciaModal from './EmergenciaModal';
import EmergencyProviderListModal from './EmergencyProviderListModal';

// Importar os modais existentes (serão refatorados para usar o contexto)
// Por enquanto, vamos criar placeholders que serão substituídos

const ModalManager: React.FC = () => {
  const { activeModal, modalProps, closeModal, showModal } = useModal();
  const [selectedEmergencyCategory, setSelectedEmergencyCategory] = useState<string | null>(null);

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
        <EmergenciaModal
          onClose={() => {
            closeModal();
            setSelectedEmergencyCategory(null);
          }}
          onSelectCategory={(category) => {
            setSelectedEmergencyCategory(category);
            showModal('emergencyProviders', { category });
          }}
        />
      );

    case 'emergencyProviders':
      return (
        <EmergencyProviderListModal
          category={modalProps.category}
          onClose={() => {
            closeModal();
            setSelectedEmergencyCategory(null);
          }}
          onBack={() => {
            showModal('emergency');
          }}
          onSelectProvider={(provider) => {
            // Aqui você pode implementar a lógica para mostrar detalhes do prestador
            // Por exemplo, abrir o modal de detalhes do prestador
            alert(`Prestador selecionado: ${provider.nome}\nTelefone: ${provider.telefone}`);
          }}
        />
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
