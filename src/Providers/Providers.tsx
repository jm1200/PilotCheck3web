import { ApolloProvider } from "./ApolloProvider";
import React from "react";
import { AuthProvider } from "./AuthProvider";
import { ChakraProvider } from "@chakra-ui/react";
import App from "../App";
import theme from "../theme";
import { AppStateProvider } from "./AppStateProvider";

export const Providers: React.FC = () => {
  return (
    <>
      <ApolloProvider>
        <AuthProvider>
          <AppStateProvider>
            <ChakraProvider resetCSS theme={theme}>
              <App />
            </ChakraProvider>
          </AppStateProvider>
        </AuthProvider>
      </ApolloProvider>
    </>
  );
};
