import React from 'react';
import clsx from 'clsx';

type UiButtonProps = {
  variant: 'cancel' | 'submit';
  text: string;
} & React.ComponentProps<'button'>;

const UiButton = ({ variant, text, className, onClick, type }: UiButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        'flex items-center px-5 py-2 rounded gap-2 disabled:bg-gray-300 disabled:hover:bg-gray-300',
        variant === 'submit' && 'bg-green-500 hover:bg-green-400',
        variant === 'cancel' && 'border-1 border-black bg-transparent hover:bg-gray-100',
        className
      )}
    >
      {text}
    </button>
  );
};

export default UiButton;
