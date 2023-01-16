import React from 'react';
import { IconProps } from './icons.types';

const IconBase = ({ size, children, ...restProps }: IconProps) => {
  const baseSize = size ?? 24;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={baseSize}
      height={baseSize}
      fill="currentColor"
      viewBox="0 0 24 24"
      {...restProps}
    >
      {children}
    </svg>
  );
};

export default IconBase;
