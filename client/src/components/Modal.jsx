import { Modal as ResModal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const Modal = ({ children, open, onClose }) => {
  return (
    <ResModal open={open} onClose={onClose} center>
      {children}
    </ResModal>
  );
};

export default Modal;
