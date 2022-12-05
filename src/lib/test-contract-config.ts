import { Chain, chain } from 'wagmi';
import TestContract from '../abi/TestContract.json'

export const testContract = (contractChain?: Chain) => {
    switch (contractChain?.id) {
      case chain.mainnet.id:
        return {
          address: '0x0000000000000000000000000000000000000000',
          abi: TestContract.abi,
        };
        case chain.goerli.id:
        return {
          address: '0xCF954d065E3069bD5355A9C703dEC76D07122377',
          abi: TestContract.abi,
        };
      default:
        return {
          address: '0xCF954d065E3069bD5355A9C703dEC76D07122377',
          abi: TestContract.abi,
        };
    }
  };
  