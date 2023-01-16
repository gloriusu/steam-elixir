import Head from 'next/head';
import React from 'react';
import { SiMinutemailer } from 'react-icons/si';
import UiCard from '../../components/UI/UiCard/UiCard';

const Contacts = () => {
  return (
    <>
      <Head>
        <title>Contacts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full h-sc">
        <div className="flex items-center justify-center h-full w-full">
          <UiCard className="flex flex-col items-center gap-4 p-12 mb-26">
            <SiMinutemailer size={100} />
            <p className="text-2xl font-medium">Email: pytsko.oleh@gmail.com</p>
            <p className="text-2xl font-medium">Email: chuiko.nazarii@gmail.com</p>
          </UiCard>
        </div>
      </div>
    </>
  );
};

export default Contacts;
