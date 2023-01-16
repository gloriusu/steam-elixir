import React from 'react';
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from 'react-icons/ai';
import { SiElixir } from 'react-icons/si';
import Link from 'next/link';

type HeaderNavbarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (currentState: boolean) => void;
};

const HeaderNavbar = ({ isSidebarOpen, setIsSidebarOpen }: HeaderNavbarProps) => {
  return (
    <div className="flex h-18 w-full top-0 bg-white flex-shrink-0 fixed z-40">
      <div className="flex items-center w-full h-full">
        <div className="flex items-center w-20 justify-center flex-shrink-0">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <AiOutlineMenuFold size={32} /> : <AiOutlineMenuUnfold size={32} />}
          </button>
        </div>
        <Link href="/">
          <a>
            <span className="flex items-center text-xl font-bold gap-1">
              <SiElixir size={28} />
              SteamElixir
            </span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default HeaderNavbar;
