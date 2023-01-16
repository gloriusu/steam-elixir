import type { NextPage } from 'next';
import Head from 'next/head';
import UiCard from '../components/UI/UiCard/UiCard';
import { GiGamepad } from 'react-icons/gi';
import { SiElixir } from 'react-icons/si';
import Link from 'next/link';
import React from 'react';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>SteamElixir</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full h-sc">
        <div className="flex items-center justify-center h-full w-full">
          <UiCard className="flex flex-col items-center justify-center gap-6 p-16 mb-26">
            <SiElixir size={90} />
            <div className="flex items-center justify-center">
              <h1 className="text-2xl font-medium">
                Welcome to <span className="font-bold">SteamElixir</span> store!
              </h1>
            </div>
            <Link href="/games">
              <a className="flex items-center justify-center gap-1 bg-black text-white rounded-xl px-3 py-2 hover:bg-gray-800">
                <GiGamepad size={24} />
                <span className="font-medium">Games</span>
              </a>
            </Link>
          </UiCard>
        </div>
      </div>
    </>
  );
};

export default Home;
