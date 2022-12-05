import { FC } from "react";
import { AiFillCopy } from 'react-icons/ai';
import { TokenProps } from "../interfaces/ISwapModal";


export const TokenRow:FC<TokenProps> = ({token}) => {

  return (
    <div className="bg-customLightBlue w-[90%] border rounded-xl h-[3rem] text-customDeepBlue p-[5px] text-sm">
      <div>{token.symbol}</div>
      <div className="flex justify-between">
        <div>{token.id.slice(0,4)} ... {token.id.slice(38,42)}</div>
        <AiFillCopy />
      </div>
  
    </div>
  );
};
