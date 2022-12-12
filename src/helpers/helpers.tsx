import { BigNumber, ethers } from "ethers";
import { format } from "node:path/win32";
import { Token } from "../interfaces/ISwap";

export function checkIsTokenAlreadyExist(existedTokens:Token[] | undefined, currentToken: Token){

    return (!existedTokens?.find((existedToken:Token) => existedToken.id == currentToken.id))
}

export function objectStringify(token:Token | undefined){
    return JSON.stringify(token)
}

export function objectParse(token: string){
    return JSON.parse(token)
}

export async function addTokenToWallet(token:Token | undefined,ethereum:any){
    try {
        const wasAdded = await ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: token?.id,
              symbol: token?.symbol,
              decimals: token?.decimals,
            },
          },
        });
        if (wasAdded) {
          console.log('Thanks for your interest!');
        } else {
          console.log('Your loss!');
        }
      } catch (error) {
        console.log(error);
      }
}

export function formatBigNumberToNumber(tokenValue:BigNumber[], decimals:string | undefined){
    return ethers.utils.formatUnits(tokenValue?.[1] ?? 0, decimals)
}
export function weiToEth(tokenValue:BigNumber, decimals: string | undefined){
    return ethers.utils.formatUnits(tokenValue ? tokenValue : 0, decimals)
}