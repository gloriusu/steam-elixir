import React from 'react';
import clsx from 'clsx';

type UiDividerProps = React.ComponentProps<'div'>;

const UiDivider = ({ className }: UiDividerProps) => {
  return (
    <div className="w-full">
      <div className={clsx('h-px bg-gray-200 w-full', className)} />
    </div>
  );
};

export default UiDivider;
