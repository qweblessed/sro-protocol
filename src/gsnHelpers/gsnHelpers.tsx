import { RelayProvider } from "@opengsn/provider";
import { Contract, ethers, Signer } from "ethers";
import TokenPaymaster from "../abi/TokenPaymaster.json"
import TokenSwap from "../abi/TokenSwap.json";
import { objectParse } from "../helpers/helpers";
import { Token } from "../interfaces/ISwapModal";

export async function getGsnProvider(){
    const gsnConfig: Partial<any> = {
      loggerConfiguration: {
        logLevel: "error",
      },
      paymasterAddress: '0xb1A4C35541Ab3CD7fc872C5dD147CF4444E81B96',
    };

    if(window.ethereum){
        const gsnProvider = await RelayProvider.newProvider({
            provider: window.ethereum as any,
            config: gsnConfig,
        }).init();

        const provider = new ethers.providers.Web3Provider(gsnProvider as any) ;

        return  provider
    }
 
  };

  export async function getMinGas(signer:Signer){
    const gsnPaymasterInstance = new Contract(
      '0xb1A4C35541Ab3CD7fc872C5dD147CF4444E81B96',
      TokenPaymaster.abi,
      signer,
    );

    return await gsnPaymasterInstance.minGas()
  };

  export async function SwapTokenToEth(signer:Signer, token:Token, amount:string, setErrorModal:Function, setErrorModalText:Function) {
    if (signer) {
      const provider = await getGsnProvider();
      const tokenSwap = new Contract(
        "0x108e544A4f03241483d296e1fA288029DB61f702",
        TokenSwap.abi,
        signer
      );
      if (provider) {
        const minGas = await getMinGas(signer)
        try {
          await tokenSwap.connect(provider.getSigner())
          .swapTokensForEth('0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', ethers.utils.parseUnits(amount,token.decimals), {gasLimit: minGas});
      
        } catch(error){
          if(error instanceof Error){          
            setErrorModal(true)
            setErrorModalText(error.message)
          }
        }
      }
    }
  }