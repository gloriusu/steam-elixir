import React from 'react';
import clsx from 'clsx';
import { BiError } from 'react-icons/bi';

type UiValidationErrorProps = {
  errorText: string;
  isShowIcon?: boolean;
} & React.ComponentProps<'p'>;

const UiValidationError = ({ errorText, isShowIcon = true, className }: UiValidationErrorProps) => {
  return (
    <p className={clsx('flex items-center gap-1 text-red-500', className)}>
      {isShowIcon && <BiError size={24} />} {errorText}
    </p>
  );
};

export default UiValidationError;
