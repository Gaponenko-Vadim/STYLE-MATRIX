import React from "react";
import Modal from "../Modal";
import LoginForm from "../LoginForm";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <LoginForm onSuccess={onClose} />
    </Modal>
  );
};

export default AuthModal;
