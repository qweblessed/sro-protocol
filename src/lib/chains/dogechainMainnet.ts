import { Chain } from 'wagmi';

export const dogechainMainnet: Chain = {
  id: 2000,
  name: 'DogeChain',
  network: 'DOGE',
  rpcUrls: {
    default: 'https://rpc-us.dogechain.dog',
  },
  nativeCurrency: {
    name: 'Dogecoin',
    symbol: 'DOGE',
    decimals: 8,
  },
  blockExplorers: {
    default: {
      name: 'DogeChain',
      url: 'https://explorer.dogechain.dog',
    },
  },
  testnet: false,
};
