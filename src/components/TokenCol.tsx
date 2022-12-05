import { FC } from "react";
import { TokenProps } from "../interfaces/ISwapModal";


export const TokenCol:FC<TokenProps> = ({token}) => {

  return (
    <div className="flex justify-center items-center bg-customLightBlue  w-[100%] h-[30px] border rounded-xl text-customDeepBlue p-2">
      <div>{token.symbol}</div>
    </div>
  );
};
