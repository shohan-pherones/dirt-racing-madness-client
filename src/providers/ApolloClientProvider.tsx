"use client";

import { client } from "@/graphql/client";
import { ApolloProvider } from "@apollo/client";
import { PropsWithChildren } from "react";

const ApolloClientProvider = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
