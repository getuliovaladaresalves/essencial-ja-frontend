import React, { createContext, useContext, useState, ReactNode } from 'react';

// Tipos para o contexto
interface ModalContextType {
  activeModal: string | null;
  modalProps: Record<string, any>;
  showModal: (modalName: string | null, props?: Record<string, any>) => void;
  closeModal: () => void;
}

// Criação do contexto
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Hook personalizado para usar o contexto
export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal deve ser usado dentro de um ModalProvider');
  }
  return context;
};

// Props do Provider
interface ModalProviderProps {
  children: ReactNode;
}

// Provider do contexto
export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalProps, setModalProps] = useState<Record<string, any>>({});

  const showModal = (modalName: string | null, props: Record<string, any> = {}) => {
    setActiveModal(modalName);
    setModalProps(props);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalProps({});
  };

  const value: ModalContextType = {
    activeModal,
    modalProps,
    showModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
