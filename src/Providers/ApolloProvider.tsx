import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as AP,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

export const ApolloProvider: React.FC = ({ children }) => {
  return <AP client={client}>{children}</AP>;
};
