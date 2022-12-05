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
  defaultChains,
  WagmiConfig,
} from "wagmi";
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from "wagmi/providers/public";
import { ThemeProvider } from "next-theme";
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

import Layout from "../components/Layout";

const { chains, provider } = configureChains(
  [chain.goerli],
  [
    infuraProvider({ apiKey: '0f93404456e04fda97678c9174f03f69', priority: 0 }),
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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={midnightTheme({
            accentColor: "#fffff",
            accentColorForeground: "fffff",
            borderRadius: "medium",
            fontStack: "system",
            overlayBlur: "small",
          })}
          modalSize="compact"
        >
          <Layout>
            <Component {...pageProps} />{" "}
          </Layout>
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
}
