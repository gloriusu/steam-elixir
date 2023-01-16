import React, { useState } from 'react';
import clsx from 'clsx';
import Sidebar from './Sidebar/Sidebar';
import HeaderNavbar from './Header/HeaderNavbar';
import LayoutBody from './LayoutBody/LayoutBody';

const Layout = ({ children, className }: React.ComponentProps<'div'>) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className={clsx('flex flex-col pt-18', className)}>
      <HeaderNavbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex min-h-fw w-full">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <LayoutBody isSidebarOpen={isSidebarOpen}>{children}</LayoutBody>
      </div>
    </div>
  );
};

export default Layout;
