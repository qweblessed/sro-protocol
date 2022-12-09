import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Token, TokensResponse } from "../../interfaces/ISwap";
import { PAIRS_QUERY } from "../api/thegraph/queries";
import SelectTokensModal from "../../components/SelectTokensModal";
import { useConnect, useContractWrite, useNetwork, usePrepareContractWrite, useSigner } from "wagmi";
import  TokenSwap  from "../../abi/TokenSwap.json";
import { Contract, ethers } from "ethers";
import { initGsn } from "../../gsnHelpers/gsnHelpers";
import { RelayProvider } from "@opengsn/provider/dist/RelayProvider";
import { getProvider } from '@wagmi/core'
import Web3 from 'web3'


export default function Swap() {
  const { loading, error, data } = useQuery(PAIRS_QUERY)
  const { chain } = useNetwork();
  const [selectedTokenAmount, setSelectedTokenAmount] = useState<number>(0);
  const [displayedTokens, setDisplayedTokens] = useState<Token[] | undefined>();
  const [selectedToken, setSelectedToken] = useState<string>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const signer = useSigner().data;


  const getTopLiquidTokens = async () => {
    if(!loading && !error){
      const formattedTokens = data.pairs.map((item:TokensResponse) => {
        return item.token0
      })
      setSelectedToken(formattedTokens[0])
      setDisplayedTokens(formattedTokens);
    }
  };
  async function swap() {
    const gsnConfig: Partial<any> = {
      loggerConfiguration: {
        logLevel: "error",
      },
      paymasterAddress: '0xb1A4C35541Ab3CD7fc872C5dD147CF4444E81B96',
    };
  
    const gsnProvider = await RelayProvider.newProvider({
      provider: window.ethereum as any,
      config: gsnConfig,
    }).init();

    // const gasFees = await gsnProvider.calculateGasFees()

    const provider = new ethers.providers.Web3Provider(gsnProvider as any);
    console.log('provider',provider)
    // const provider = new ethers.providers.Web3Provider(gsnProvider);

  }

  useEffect(() => {
    getTopLiquidTokens();
  }, [loading,error]); 
  
  return (
    <div className="flex justify-center mt-2 mb-2">

      <div className="items-center w-[35%] p-5 h-[40rem] bg-customDeepBlue rounded-2xl shadow-sm shadow-customLightBlue mt-2 ">
        {showModal ? 
          <SelectTokensModal 
            tokens={displayedTokens} 
            setShowModal={setShowModal} 
            setSelectedToken={setSelectedToken} 
            selectedToken={selectedToken}
            setDisplayedTokens={setDisplayedTokens} /> 
          : null}
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
                  <select className="flex  w-full h-min items-center bg-customSkyBlue rounded-2xl text-lg cursor-pointer p-2"
                   defaultValue={selectedToken}
                   onChange={(e) => {
                    setSelectedToken(e.target.value)
                   }}
                  value={selectedToken}
                  >
                    {displayedTokens?.map((token:Token) => {
                      return (
                        <option value={token.id} key={token.id} >
                          <p>{token.symbol}</p>
                        </option>
                      )})}                
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
                <div className="flex w-1/4">
                  <div className="flex justify-center w-full h-min items-center bg-customSkyBlue rounded-2xl text-lg  p-2" >
                    ETH
                  </div>
                </div>
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
              <button onClick={() => swap()}>Swap</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

  
