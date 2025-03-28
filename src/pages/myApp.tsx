import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app"; // Importa o tipo AppProps

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
