import { Token } from "graphql";
import { FC } from "react";
import { TokenProps } from "../interfaces/ISwapModal";


export const TokenCol:FC<TokenProps> = ({token,setSelectedToken,setDisplayedTokens,displayedTokens}) => {

  return (
    <div  className="flex justify-center items-center bg-slate-200 border-gray-300 border-2 w-[100%] h-[30px] rounded-md text-customDeepBlue p-2 cursor-pointer font-semibold hover:bg-customGreen transition duration-500" onClick={()=>{
      if(!displayedTokens?.find((existedTokens) => existedTokens.id == token.id)){
        setDisplayedTokens?.((current: Token[]) => {    
          if (!current) {
            return [token];
          } else {
             return [...current, token];
          }      
      });
    }
      setSelectedToken(token)
    }}>
      <div>{token.symbol}</div>
    </div>
  );
};
