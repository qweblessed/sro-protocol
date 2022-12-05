import { Chain } from 'wagmi';

export const fantomMainnet: Chain = {
  id: 250,
  name: 'Fantom Opera',
  network: 'FTM',
  rpcUrls: {
    default: 'https://rpc.ftm.tools/',
  },
  nativeCurrency: {
    name: 'Fantom Token',
    symbol: 'FTM',
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: 'Fantom Scan',
      url: 'https://ftmscan.com/',
    },
  },
  testnet: false,
};
