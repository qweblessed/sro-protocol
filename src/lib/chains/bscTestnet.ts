import { Chain } from 'wagmi';

export const bscTestnet: Chain = {
  id: 97,
  name: 'BSC Testnet',
  network: 'bsc testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'BSC Testnet',
    symbol: 'tBNB',
  },
  rpcUrls: {
    default: 'https://bsc-testnet.public.blastapi.io',
    'data-seed-prebsc-1-s3': 'https://data-seed-prebsc-1-s3.binance.org:8545',
  },
  blockExplorers: {
    default: { name: 'bscscan', url: 'https://www.bscscan.com/' },
  },
  testnet: true,
};
