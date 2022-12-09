import { useQuery } from "@apollo/client";
import { RelayProvider } from "@opengsn/provider";
import { ethers } from "ethers";
import { FC } from "react";
import { AiFillCopy } from 'react-icons/ai';
import { checkIsTokenAlreadyExist } from "../helpers/helpers";
import { Token } from "../interfaces/ISwap";
import { TokenProps } from "../interfaces/ISwapModal";

export const TokenRow:FC<TokenProps> = ({token, setSelectedToken, selectedToken, setDisplayedTokens, displayedTokens}) => {
    
  function addToken(existedTokens:Token[] | undefined, currentToken: Token){
    if(checkIsTokenAlreadyExist(existedTokens,currentToken)) {
      setDisplayedTokens?.((current: Token[]) => {    
        if (!current) {
          return [token];
        } else {
          return [...current, token];
        }})
      }
  }  

  return (
    <div  className={
      token.id == selectedToken?.id ?
       "bg-customSkyBlue w-[90%] border rounded-xl h-[3rem] text-customDeepBlue p-[5px] text-sm cursor-pointer" :
       "bg-customLightBlue w-[90%] border rounded-xl h-[3rem] text-customDeepBlue p-[5px] text-sm cursor-pointer"}
        onClick={() => {
          setSelectedToken(token)
          addToken(displayedTokens, token)
       }
    }>
      <div>{token.symbol}</div>
      <div className="flex justify-between">
        <div>{token.id.slice(0,4)} ... {token.id.slice(38,42)}</div>
        <AiFillCopy />
      </div>
    </div>
  );
};
