import { Chain } from 'wagmi';

export const ethwMainnet: Chain = {
  id: 10001,
  name: 'EthereumPoW',
  network: 'ethw mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'EthereumPoW',
    symbol: 'ETHW',
  },
  rpcUrls: {
    // alchemy: "https://mainnet.ethereumpow.org",
    default: 'https://mainnet.ethereumpow.org',
    // infura: "https://mainnet.ethereumpow.org",
    // public: "https://mainnet.ethereumpow.org"
  },
  blockExplorers: {
    default: { name: 'ethwscan', url: 'https://mainnet.ethwscan.com' },
  },
  testnet: false,
};
