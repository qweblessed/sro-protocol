import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ApproveType, Token, TokensResponse } from "../../interfaces/ISwap";
import { PAIRS_QUERY } from "../api/thegraph/queries";
import SelectTokensModal from "../../components/SelectTokensModal";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useSigner,
} from "wagmi";
import { SwapTokenToEth } from "../../gsnHelpers/gsnHelpers";
import { addTokenToWallet, formatBigNumberToNumber, objectParse, objectStringify, weiToEth } from "../../helpers/helpers";
import { ERC20Contract } from "../../lib/ERC20Contract-config";
import { BigNumber, ethers } from "ethers";
import ApproveTokenModal from "../../components/ApproveTokenModal";
import { UniswapV2Contract } from "../../lib/UniswapV2Contract-config";

export default function Swap() {
  const { chain } = useNetwork();
  const { loading, error, data } = useQuery(PAIRS_QUERY);
  const { address } = useAccount();
  const [selectedTokenAmount, setSelectedTokenAmount] = useState<number>(0);
  const [displayedTokens, setDisplayedTokens] = useState<Token[] | undefined>();
  const [selectedToken, setSelectedToken] = useState<Token>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showApproveModal, setShowApproveModal] = useState<boolean>(false);
  const [tokenModal, setTokenModal] = useState<string | undefined>("");
  const [approveType, setApproveType] = useState<ApproveType>(2);
  const signer = useSigner().data;

  const getTopLiquidTokens = async () => {
    if (!loading && !error) {
      const formattedTokens = data.pairs.map((item: TokensResponse) => {
        return item.token0;
      });
      setSelectedToken(formattedTokens[0]);
      setDisplayedTokens(formattedTokens);
    }
  };

  const { data: tokenValue } = useContractRead({
    ...UniswapV2Contract(chain),
    functionName: 'getAmountsOut',
    args:[ethers.utils.parseUnits("1"), [process.env.UNISWAP_WETH, selectedToken?.id]]
  });

  const { data: selectedTokenSupply } = useContractRead({
    ...ERC20Contract(chain, selectedToken?.id),
    functionName: 'totalSupply',
    onError(){
      console.log('totalSupply error')
    }
  });
  const { data: totalBurned } = useContractRead({
    ...ERC20Contract(chain, selectedToken?.id),
    functionName: 'balanceOf',
    args:['0x000000000000000000000000000000000000dead'],
    onError(){
      console.log('balanceOf(0xdead) error')
    }
  });
    
  const { data: approvedZroTokenAmount } = useContractRead({
    ...ERC20Contract(chain, process.env.ZRO_TOKEN),
    functionName: 'allowance',
    args:[address, process.env.GSN_TOKEN_SWAP]
  });

  const { data: approvedSelectedTokenAmount } = useContractRead({
    ...ERC20Contract(chain,selectedToken?.id),
    functionName: 'allowance',
    args:[address, process.env.GSN_TOKEN_SWAP]
  });

  const { config: configZroTokenApprove } = usePrepareContractWrite({
    ...ERC20Contract(chain,process.env.ZRO_TOKEN),
    functionName: 'approve',
    args: [process.env.GSN_TOKEN_SWAP, ethers.constants.MaxUint256],
    onError(){
      console.log('zroConfigApprove error')
    }
  });

  const { config: configSelectedTokenApprove } = usePrepareContractWrite({
    ...ERC20Contract(chain,selectedToken?.id),
    functionName: 'approve',
    args: [process.env.GSN_TOKEN_SWAP, ethers.constants.MaxUint256],
    onError(){
      console.log('tokenConfigApprove error')
    }
  });

  const {
    data: approveSelectedTokenData,
    write: approveSelectedToken,
    isLoading: isTokenLoading,
    isSuccess: isTokenSuccess,
    isError: isTokenError,
  } = useContractWrite({
    ...configSelectedTokenApprove,
  });

  const {
    data: approveZroTokenData,
    writeAsync: approveZroTokens,
    isLoading: isZroLoading,
    isSuccess: isZroSuccess,
    isError: isZroError,
  } = useContractWrite({
    ...configZroTokenApprove,
  });

  const setupApprovalSteps = async () => {
    if (
      Number(approvedZroTokenAmount) < 10000 &&
      Number(approvedSelectedTokenAmount) < selectedTokenAmount
    ) {
      setApproveType(2);
      approveZroTokens?.();
      approveSelectedToken?.();
      return;
    }
    if (Number(approvedZroTokenAmount) < 10000) {
      setApproveType(0);
      approveZroTokens?.();
      return;
    }
    if (Number(approvedSelectedTokenAmount) < selectedTokenAmount) {
      setApproveType(1);
      approveSelectedToken?.();
      return;
    } else {
      setApproveType(3);
    }
  };

  async function swap(selectedToken: Token) {
    if (!signer) return alert("!signer or !selectedToken");

    setupApprovalSteps();

    if(approveType == 3){
      SwapTokenToEth(signer, selectedToken, selectedTokenAmount.toString());
    } else {
      setShowApproveModal(true);
      SwapTokenToEth(signer, selectedToken, selectedTokenAmount.toString());
    }
  }

  useEffect(() => {
    getTopLiquidTokens();
  }, [loading]);

  useEffect(() => {
    getTopLiquidTokens();
  }, [loading]);

  return (
    <div className="flex justify-center mt-2 mb-2">
      <div className="items-center w-[35%] p-5 h-[40rem] bg-customDeepBlue rounded-2xl shadow-sm shadow-customLightBlue mt-2 ">
        {showApproveModal ? (
          <ApproveTokenModal
            isSelectedTokenLoading={isTokenLoading}
            isZroLoading={isZroLoading}
            setShowApproveModal={setShowApproveModal}
            approveType={approveType}
            selectedTokenTxData={approveSelectedTokenData}
            zroTokenTxData={approveZroTokenData}
            isZroError = {isZroError}
            isSelectedTokenError = {isTokenError}
            selectedTokenSymbol={selectedToken?.symbol}
          />
        ) : null}

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
              <p className="text-center mt-2 mb-2 cursor-pointer text-sky-500" onClick={() => addTokenToWallet(selectedToken, window.ethereum)}> Add token To Metamask </p>
              <ul className="text-center">
                <li>1 ETH = {(+formatBigNumberToNumber(tokenValue as BigNumber[], selectedToken?.decimals)).toFixed(2)} {selectedToken?.symbol}</li>
                <li>Total Supply: {(+weiToEth(selectedTokenSupply as BigNumber,selectedToken?.decimals)).toFixed(2)}</li>
                <li>Total {selectedToken?.symbol} Burned: {(+weiToEth(totalBurned as BigNumber,selectedToken?.decimals)).toFixed(2)}</li>
              </ul>
              <div className="flex items-center justify-center cursor-pointer border rounded-2xl bg-customSkyBlue text-xl text-customDeepBlue font-semibold my-2 py-6 px-8">
                Review swap
              </div>
              <button
                onClick={() => {
                  if (selectedToken) {
                    swap(selectedToken);
                  } else {
                    // alert('!selected token')
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
