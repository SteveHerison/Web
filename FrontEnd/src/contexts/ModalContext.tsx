import { createContext, useContext, useState, ReactNode } from "react";

// Define os tipos para o contexto
interface ModalContextType {
  isModalOpen: boolean;
  modalContent: ReactNode | null;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

// Crie o contexto
const ModalContext = createContext<ModalContextType | null>(null);

// Provider do Modal
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const openModal = (content: ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider
      value={{ isModalOpen, modalContent, openModal, closeModal }}
    >
      {children}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative p-6 bg-white rounded-lg shadow-lg">
            <button
              onClick={closeModal}
              className="absolute text-gray-500 top-2 right-2 hover:text-gray-700"
            >
              X
            </button>
            {modalContent}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

// Hook para usar o contexto do Modal
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal deve ser usado dentro de um ModalProvider");
  }
  return context;
};
