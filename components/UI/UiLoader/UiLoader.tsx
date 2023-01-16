import React from 'react';
import clsx from 'clsx';

type UiSpinerProps = {
  size?: 'small' | 'medium' | 'large';
} & React.ComponentProps<'div'>;

const UiLoader = ({ size = 'small', className }: UiSpinerProps) => {
  return (
    <div className={clsx('flex items-center justify-center', size === 'large' && 'h-fw -mt-12', className)}>
      <div
        className={clsx(
          'animate-spin rounded-full border-t-4 border-b-4 border-black',
          size === 'small' && 'w-12 h-12',
          size === 'medium' && 'w-26 h-26',
          size === 'large' && 'w-40 h-40'
        )}
        role="status"
      />
    </div>
  );
};

export default UiLoader;
