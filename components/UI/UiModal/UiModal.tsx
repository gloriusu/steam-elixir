import React from 'react';
import clsx from 'clsx';

type UiModalProps = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
} & React.ComponentProps<'div'>;

const UiModal = ({ children, isVisible, setIsVisible, className }: UiModalProps) => {
  return (
    <div
      className={clsx('fixed inset-0 modal-color z-100', isVisible ? 'flex justify-center items-center' : 'hidden')}
      onClick={() => setIsVisible(false)}
    >
      <div className={'p-8 bg-white rounded ' + className} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default UiModal;
