import '@/styles/globals.css';

import { ChakraProvider, theme } from '@chakra-ui/react';
import { AuthProvider } from '../context/AuthContext';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </>
  );
}
