import { RelayProvider } from "@opengsn/provider";
import { ethers } from "ethers";

export async function initGsn(){
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
