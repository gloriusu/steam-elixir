import React from 'react';
import clsx from 'clsx';

type UiCardProps = {
  padding?: string;
} & React.ComponentProps<'div'>;

const UiCard = ({ children, className, padding = 'p-6', ...restProps }: UiCardProps) => {
  return (
    <div className={clsx('rounded-md drop-shadow-lg min-w-0 bg-white', padding, className)} {...restProps}>
      {children}
    </div>
  );
};

export default UiCard;
