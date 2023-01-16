import React from 'react';
import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import Layout from '../components/layout/Layout';
import NProgress from 'nprogress';
import CART from '../services/cart/gamesCart';

import '../styles/globals.css';
import 'nprogress/nprogress.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  NProgress.configure({ showSpinner: false });

  React.useEffect(() => {
    CART.init();
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on('routeChangeStart', handleRouteStart);
    Router.events.on('routeChangeComplete', handleRouteDone);
    Router.events.on('routeChangeError', handleRouteDone);

    return () => {
      Router.events.off('routeChangeStart', handleRouteStart);
      Router.events.off('routeChangeComplete', handleRouteDone);
      Router.events.off('routeChangeError', handleRouteDone);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
