import React from 'react';
import clsx from 'clsx';
import SidebarItem from './SidebarItem';
import CartIcon from '../../Icons/CartIcon';
import { MdEmail } from 'react-icons/md';
import { GiGamepad } from 'react-icons/gi';

type SidebarProps = {
  isSidebarOpen: boolean;
} & React.ComponentProps<'aside'>;

const Sidebar = ({ isSidebarOpen, className }: SidebarProps) => {
  return (
    <aside
      className={clsx(
        'h-fw fixed z-20 space-y-2.5 flex-shrink-0 bg-white py-2.5 px-3 transition-width duration-75',
        isSidebarOpen ? 'w-50' : 'w-20',
        className
      )}
    >
      <SidebarItem route="/games" title="Games" isSidebarOpen={isSidebarOpen} icon={GiGamepad} />
      <SidebarItem route="/cart" title="Cart" isSidebarOpen={isSidebarOpen} icon={CartIcon} />
      <SidebarItem route="/contacts" title="Contacts" isSidebarOpen={isSidebarOpen} icon={MdEmail} />
    </aside>
  );
};

export default Sidebar;
