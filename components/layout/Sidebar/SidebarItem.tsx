import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

type SidebarItemProps = {
  route: string;
  title: string;
  isSidebarOpen: boolean;
  icon: React.ElementType;
};

const SidebarItem = ({ route, title, icon: Icon, isSidebarOpen }: SidebarItemProps) => {
  const router = useRouter();
  const isExactRoute = router.pathname === route;
  return (
    <Link href={route}>
      <a
        className={clsx(
          'flex overflow-hidden items-center gap-2 p-4 rounded duration-75 w-full hover:bg-gray-200',
          isExactRoute && 'bg-black hover:bg-black'
        )}
      >
        <span>
          <Icon className={clsx('duration-75 flex-shrink-0', isExactRoute && 'text-white')} size={24} />
        </span>
        <span
          className={clsx(
            'text-lg font-medium duration-75',
            isExactRoute && 'text-white',
            !isSidebarOpen && 'text-transparent'
          )}
        >
          {title}
        </span>
      </a>
    </Link>
  );
};

export default SidebarItem;
