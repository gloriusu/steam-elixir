import React from 'react';
import clsx from 'clsx';

type LayoutBodyProps = {
  isSidebarOpen: boolean;
} & React.ComponentProps<'main'>;

const LayoutBody = ({ isSidebarOpen, children, className }: LayoutBodyProps) => {
  return (
    <main
      className={clsx('flex-grow min-w-0 pt-12 bg-neutral-200 h-full', isSidebarOpen ? 'pl-60' : 'pl-32', className)}
    >
      {children}
    </main>
  );
};

export default LayoutBody;
