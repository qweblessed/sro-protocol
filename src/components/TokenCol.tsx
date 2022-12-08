import { Token } from "graphql";
import { FC } from "react";
import { TokenProps } from "../interfaces/ISwapModal";


export const TokenCol:FC<TokenProps> = ({token,setSelectedToken,setDisplayedTokens,displayedTokens}) => {

  return (
    <div  className="flex justify-center items-center bg-customLightBlue  w-[100%] h-[30px] border rounded-xl text-customDeepBlue p-2 cursor-pointer" onClick={()=>{
      if(!displayedTokens?.find((existedTokens) => existedTokens.id == token.id)){
        setDisplayedTokens?.((current: Token[]) => {    
          if (!current) {
            return [token];
          } else {
             return [...current, token];
          }      
      });
    }
      setSelectedToken(token.id)
    }}>
      <div>{token.symbol}</div>
    </div>
  );
};
