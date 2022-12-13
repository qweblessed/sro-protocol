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
       "bg-customGreen w-[90%] border rounded-md h-[3rem] border-green-600 text-customDeepBlue p-[5px] text-sm cursor-pointer" :
       "bg-slate-200 w-[90%] border rounded-md h-[3rem] border-gray-300 border-2 text-customDeepBlue p-[5px] text-sm cursor-pointer hover:bg-slate-300 transition duration-300"}
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
