import { Chain, chain } from 'wagmi';
import UniswapV2 from '../abi/IUniswapV2Router02.json'

export const UniswapV2Contract = (contractChain?: Chain) => {
    switch (contractChain?.id) {
      case chain.mainnet.id:        
        return {
          address: process.env.UNISWAP_ROUTER,
          abi: UniswapV2.abi,
        };

      default:
        return {
          address: process.env.UNISWAP_ROUTER,
          abi: UniswapV2.abi,
        };
    }
  };
  