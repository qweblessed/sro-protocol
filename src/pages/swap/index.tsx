import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Token, TokensResponse } from "../../interfaces/ISwap";
import { PAIRS_QUERY } from "../api/thegraph/queries";
import SelectTokensModal from "../../components/SelectTokensModal";


export default function Swap() {
  const [selectedTokenAmount, setSelectedTokenAmount] = useState<number>(0);
  const [topLiquidTokens, setTopLiquidTokens] = useState<Token[]>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedToken, setSelectedToken] = useState<string>();

  const { loading, error, data } = useQuery(PAIRS_QUERY)

  const getTopLiquidTokens = async () => {
    if(!loading && !error){
      const formattedTokens = data.pairs.map((item:TokensResponse) => {
        return item.token0
      })
      setSelectedToken(formattedTokens[0])
      setTopLiquidTokens(formattedTokens);
    }
  };
  
  useEffect(() => {
    getTopLiquidTokens();
  }, [loading,error]);

  return (
    <div className="flex justify-center mt-2 mb-2">
      <div className="items-center w-[35%] p-5 h-[40rem] bg-customDeepBlue rounded-2xl shadow-sm shadow-customLightBlue mt-2 ">
        {showModal ? 
          <SelectTokensModal tokens={topLiquidTokens} setShowModal={setShowModal}/> : null}
        <h2 className="text-center text-customRed text-3xl font-semibold">
          ERC20 To ETH Swap
        </h2>
        <div className="flex justify-center items-center ">
          <div className="flex items-center justify-center font-mono w-screen mt-6">
            <div className="bg-customBlue w-[100%] rounded-xl shadow-xl p-4">
              <div className="flex items-center justify-between font-semibold text-xl text-customSkyBlue px-2 ">
                <h1>Swap</h1>
              </div>
              <div className="flex justify-between text-customDeepBlue bg-customLightBlue rounded-2xl text-3xl border border-[#D4DBE5] my-3 p-6">
                <input
                  type="number"
                  className="w-full bg-transparent placeholder:text-customSkyBlue outline-none text-2xl mb-6"
                  onChange={(e) =>
                    setSelectedTokenAmount(Number(e.target.value))
                  }
                />
                <div className="flex w-1/4 pr-1">
                  <div className="w-full h-min text-center bg-customSkyBlue rounded-2xl text-sm cursor-pointer " 
                  onClick={() => setShowModal(!showModal)}>
                    Select token
                  </div>
                </div>
                <div className="flex w-1/4">
                  <select className="flex justify-between w-full h-min items-center bg-customSkyBlue rounded-2xl text-lg cursor-pointer p-2" onChange={(e) => setSelectedToken(e.target.value)}>
                    {topLiquidTokens?.map((token) => {
                      return (
                        <option value={token.id} key={token.id} >
                          <p >{token.symbol}</p>
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="flex justify-between bg-customLightBlue rounded-2xl text-3xl border border-[#D4DBE5] text-customDeepBlue my-3  p-6">
                <input
                  type="number"
                  className="bg-transparent placeholder:text-[#B2B9D2] outline-none mb-6 w-full text-2xl"
                  placeholder="You GET"
                  value={(selectedTokenAmount * 1.52).toFixed(2)}
                  disabled
                />
              </div>
              <p className="text-center mt-2 mb-2"> Add token To Metamask </p>
              <ul className="text-center">
                <li>1 ETH = 1200 USDC</li>
                <li>Total Supply: 8,422,561,521</li>
                <li>Total Burned: 1,241,231</li>
              </ul>
              <div className="flex items-center justify-center cursor-pointer border rounded-2xl bg-customSkyBlue text-xl text-customDeepBlue font-semibold my-2 py-6 px-8">
                Review swap
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

  
