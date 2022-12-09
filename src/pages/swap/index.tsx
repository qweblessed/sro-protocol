import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Token, TokensResponse } from "../../interfaces/ISwap";
import { PAIRS_QUERY } from "../api/thegraph/queries";
import SelectTokensModal from "../../components/SelectTokensModal";
import { useAccount, useContractRead, useContractWrite, useNetwork, usePrepareContractWrite, useSigner } from "wagmi";
import { SwapTokenToEth } from "../../gsnHelpers/gsnHelpers";
import { objectParse, objectStringify } from "../../helpers/helpers";
import { ERC20Contract } from "../../lib/test-contract-config";
import { ethers } from "ethers";
import ApproveTokenModal from "../../components/ApproveTokenModal";

export default function Swap() {
  const { chain } = useNetwork();
  const { loading, error, data } = useQuery(PAIRS_QUERY);
  const { address } = useAccount();
  const [selectedTokenAmount, setSelectedTokenAmount] = useState<number>(0);
  const [displayedTokens, setDisplayedTokens] = useState<Token[] | undefined>();
  const [selectedToken, setSelectedToken] = useState<Token>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showApproveModal, setShowApproveModal] = useState<boolean>(false);
  const [tokenModal, setTokenModal] = useState<string | undefined>('');

  const signer = useSigner().data;


  const { data: approvedZroTokenAmount } = useContractRead({
    ...ERC20Contract(chain,'0xd79F43113B22D1eA9F29cfcC7BB287489F8EE5e0'),
    functionName: 'allowance',
    args:[address,'0x108e544A4f03241483d296e1fA288029DB61f702']
  });
    console.log('approvedZroTokenAmount',approvedZroTokenAmount)
    console.log('signer?.getAddress()',address)

  const { data: approvedSelectedTokenAmount } = useContractRead({
    ...ERC20Contract(chain,selectedToken?.id),
    functionName: 'allowance',
    args:[address,'0x108e544A4f03241483d296e1fA288029DB61f702']
  });

  const { config: configZroTokenApprove } = usePrepareContractWrite({
    ...ERC20Contract(chain,'0xd79F43113B22D1eA9F29cfcC7BB287489F8EE5e0'),
    functionName: 'approve',
    args: ['0x108e544A4f03241483d296e1fA288029DB61f702', ethers.constants.MaxUint256],
    onError(){
      console.log('zroConfigApprove error')
    }
  });
  
  const { config: configSelectedTokenApprove } = usePrepareContractWrite({
    ...ERC20Contract(chain,selectedToken?.id),
    functionName: 'approve',
    args: ['0x108e544A4f03241483d296e1fA288029DB61f702', ethers.constants.MaxUint256],
    onError(){
      console.log('tokenConfigApprove error')
    }
  });
  
  const {
    data: approveSelectedTokenData,
    write: approveSelectedToken,
    isLoading:isTokenLoading,
    isSuccess:isTokenSuccess,
    isError:isTokenError,
  } = useContractWrite({
    ...configSelectedTokenApprove,
  });

  const {
    data: approveZroTokenData,
    write: approveZroTokens,
    isLoading:isZroLoading,
    isSuccess:isZroSuccess,
    isError:isZroError,
  } = useContractWrite({
    ...configZroTokenApprove,
  });

  const setupApprovalSteps = () => {     
    if(Number(approvedZroTokenAmount) < 10000){
      setTokenModal('ZRO')
      setShowApproveModal(true)
      // approveZroTokens?.()
    }

    if(Number(approvedSelectedTokenAmount) < selectedTokenAmount) {
      setTokenModal(selectedToken?.symbol)
      setShowApproveModal(true)
      // approveSelectedToken?.()
    }
   
  }

  const getTopLiquidTokens = async () => {
    if (!loading && !error) {
      const formattedTokens = data.pairs.map((item: TokensResponse) => {
        return item.token0;
      });
      setSelectedToken(formattedTokens[0]);
      setDisplayedTokens(formattedTokens);
    }
  };

  async function swap(selectedToken: Token) {
    if (!signer || !selectedToken) return alert("!signer or !selectedToken");

    setupApprovalSteps()
    SwapTokenToEth(signer, selectedToken, selectedTokenAmount.toString());
  }
  
  useEffect(() => {
    getTopLiquidTokens();
  }, [loading, error]);

  console.log('tokenModal',tokenModal)
  return (
    <div className="flex justify-center mt-2 mb-2">
      <div className="items-center w-[35%] p-5 h-[40rem] bg-customDeepBlue rounded-2xl shadow-sm shadow-customLightBlue mt-2 ">
       {showApproveModal && tokenModal == selectedToken?.symbol ? 
          <ApproveTokenModal isError={isTokenError} isSuccess={isTokenSuccess} isLoading={isTokenLoading} text={tokenModal} setShowApproveModal={setShowApproveModal}/>
        :
        showApproveModal && tokenModal == 'ZRO' ? 
          <ApproveTokenModal isError={isZroError} isSuccess={isZroSuccess} isLoading={isZroLoading} text={tokenModal} setShowApproveModal={setShowApproveModal}/> 
        : null}

        {showModal ? (
          <SelectTokensModal
            tokens={displayedTokens}
            setShowModal={setShowModal}
            setSelectedToken={setSelectedToken}
            selectedToken={selectedToken}
            setDisplayedTokens={setDisplayedTokens}
          />
        ) : null}
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
                  <div
                    className="w-full h-min text-center bg-customSkyBlue rounded-2xl text-sm cursor-pointer "
                    onClick={() => setShowModal(!showModal)}
                  >
                    Select token
                  </div>
                </div>
                <div className="flex w-1/4">
                  <select
                    className="flex  w-full h-min items-center bg-customSkyBlue rounded-2xl text-lg cursor-pointer p-2"
                    defaultValue={objectStringify(selectedToken)}
                    onChange={(e) => {
                      setSelectedToken(objectParse(e.target.value));
                    }}
                    value={objectStringify(selectedToken)}
                  >
                    {displayedTokens?.map((token: Token) => {
                      return (
                        <option value={objectStringify(token)} key={token.id}>
                          <p>{token.symbol}</p>
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
                <div className="flex w-1/4">
                  <div className="flex justify-center w-full h-min items-center bg-customSkyBlue rounded-2xl text-lg  p-2">
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
              <button
                onClick={() => {
                  if (selectedToken) {
                    swap(selectedToken);
                  } else {
                    alert('!selected token')
                  }
                }}
              >
                Swap
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
