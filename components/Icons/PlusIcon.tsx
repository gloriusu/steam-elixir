import React from 'react';
import BaseIcon from './BaseIcon';
import { IconProps } from './icons.types';

const PlusIcon = (props: IconProps) => {
  return (
    <BaseIcon {...props} width="24" height="24" viewBox="0 0 24 24">
      <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </BaseIcon>
  );
};

export default PlusIcon;
