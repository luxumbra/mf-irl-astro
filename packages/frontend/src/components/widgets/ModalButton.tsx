import { ReactElement, useState } from 'react';
import { MFModal } from '../atoms/MFModal';
import { Icon } from '@iconify/react';

export const ButtonWithModal = (): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="tooltip tooltip-bottom tooltip-primary font-bold" data-tip="Live Stream">
        <button
          onClick={() => handleModalOpen}
          className="group btn btn-ghost focus:outline-primary focus:text-secondary-dark hover:text-primary outline-dashed transition-all duration-200 ease-in-out rounded-full"
        >
          <Icon icon="mdi:youtube-tv" width="40" height="40" />
          <span className="sr-only">Live Stream</span>
        </button>
      </div>
      <MFModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
