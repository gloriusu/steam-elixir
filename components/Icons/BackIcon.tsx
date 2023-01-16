import React from 'react';
import BaseIcon from './BaseIcon';
import { IconProps } from './icons.types';

const BackIcon = (props: IconProps) => {
  return (
    <BaseIcon {...props}>
      <path
        d="M15.375 5.25L8.625 12L15.375 18.75"
        stroke="#1A1F16"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </BaseIcon>
  );
};

export default BackIcon;
