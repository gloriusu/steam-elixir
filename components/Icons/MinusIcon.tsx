import React from 'react';
import BaseIcon from './BaseIcon';
import { IconProps } from './icons.types';

const MinusIcon = (props: IconProps) => {
  return (
    <BaseIcon {...props} width="24" height="24" viewBox="0 0 24 24">
      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </BaseIcon>
  );
};

export default MinusIcon;
