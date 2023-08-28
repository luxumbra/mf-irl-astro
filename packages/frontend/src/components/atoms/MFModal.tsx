import { Modal } from 'flowbite-react';

export const MFModal = ({ isOpen, onClose }) => {
  return (
    <Modal size="7xl" isOpen={isOpen} onClose={onClose}>
      <Modal.Body>
        <iframe
          title="MetaFest Croatia: Live Stream"
          src="https://www.youtube.com/live/_JrneUEsGPY"
          width="100%"
          height="100%"
        ></iframe>
      </Modal.Body>
    </Modal>
  );
};
