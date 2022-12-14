import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  midnightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {
  Chain,
  chain,
  configureChains,
  createClient,
  useAccount,
  WagmiConfig,
} from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { ThemeProvider } from "next-theme";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const { chains, provider } = configureChains(
  [chain.mainnet],
  [
    infuraProvider({ apiKey: "0f93404456e04fda97678c9174f03f69", priority: 0 }),
    publicProvider({ priority: 1 }),
    jsonRpcProvider({
      priority: 0,
      rpc: (chain: Chain) => {
        return { http: chain.rpcUrls.default };
      },
    }),

  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export const apolloClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {

  return (
    <ThemeProvider>
      <ApolloProvider client={apolloClient}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            chains={chains}
            theme={midnightTheme({
              accentColor: '#fffff',
              accentColorForeground: 'fffff',
              borderRadius: 'medium',
              fontStack: 'system',
              overlayBlur: 'small',
            })}
            modalSize="compact"
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RainbowKitProvider>
        </WagmiConfig>
      </ApolloProvider>
    </ThemeProvider>
  );
}
