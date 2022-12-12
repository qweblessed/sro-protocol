import { Chain, chain } from 'wagmi';
import Erc20 from '../abi/ERC20.json'

export const ERC20Contract = (contractChain?: Chain, address?:string) => {
    switch (contractChain?.id) {
      case chain.mainnet.id:        
        return {
          address: address,
          abi: Erc20.abi,
        };
        case chain.goerli.id:
        return {
          address: address,
          abi: Erc20.abi,
        };
      default:
        return {
          address: address,
          abi: Erc20.abi,
        };
    }
  };
  