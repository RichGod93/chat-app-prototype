import '@/styles/globals.css';

import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '../context/AuthContext';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </>
  );
}
