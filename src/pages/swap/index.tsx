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
import {
  addTokenToWallet,
  formatBigNumberToNumber,
  objectParse,
  objectStringify,
  weiToEth,
} from "../../helpers/helpers";
import { ERC20Contract } from "../../lib/ERC20Contract-config";
import { BigNumber, ethers } from "ethers";
import ApproveTokenModal from "../../components/ApproveTokenModal";
import { UniswapV2Contract } from "../../lib/UniswapV2Contract-config";
import ErrorModal from "../../components/ErrorTokenModal";
import SwapLoader from "../../components/loader";

export default function Swap() {
  const { chain } = useNetwork();
  const { loading, error, data } = useQuery(PAIRS_QUERY);
  const { address } = useAccount();
  const [selectedTokenAmount, setSelectedTokenAmount] = useState<number>(0);
  const [displayedTokens, setDisplayedTokens] = useState<Token[] | undefined>();
  const [selectedToken, setSelectedToken] = useState<Token>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showApproveModal, setShowApproveModal] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [errorModalText, setErrorModalText] = useState<string>("");
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
    functionName: "getAmountsOut",
    args: [
      ethers.utils.parseUnits("1"),
      [process.env.UNISWAP_WETH, selectedToken?.id],
    ],
  });

  const { data: selectedTokenSupply } = useContractRead({
    ...ERC20Contract(chain, selectedToken?.id),
    functionName: "totalSupply",
    onError() {
      console.log("totalSupply error");
    },
  });

  const { data: accountTokenBalance } = useContractRead({
    ...ERC20Contract(chain, selectedToken?.id),
    functionName: "balanceOf",
    args: [address],
    onError() {
      console.log("balanceOf(userAddrr) error");
    },
  });

  const { data: totalBurned } = useContractRead({
    ...ERC20Contract(chain, selectedToken?.id),
    functionName: "balanceOf",
    args: ["0x000000000000000000000000000000000000dead"],
    onError() {
      console.log("balanceOf(0xdead) error");
    },
  });

  const { data: approvedZroTokenAmount } = useContractRead({
    ...ERC20Contract(chain, process.env.ZRO_TOKEN),
    functionName: "allowance",
    args: [address, process.env.GSN_TOKEN_SWAP],
  });

  const { data: approvedSelectedTokenAmount } = useContractRead({
    ...ERC20Contract(chain, selectedToken?.id),
    functionName: "allowance",
    args: [address, process.env.GSN_TOKEN_SWAP],
  });

  const { config: configZroTokenApprove } = usePrepareContractWrite({
    ...ERC20Contract(chain, process.env.ZRO_TOKEN),
    functionName: "approve",
    args: [process.env.GSN_TOKEN_SWAP, ethers.constants.MaxUint256],
    onError(err) {
      setErrorModal(true);
      setErrorModalText(err.message);
    },
  });

  const { config: configSelectedTokenApprove } = usePrepareContractWrite({
    ...ERC20Contract(chain, selectedToken?.id),
    functionName: "approve",
    args: [process.env.GSN_TOKEN_SWAP, ethers.constants.MaxUint256],
    onError(err) {
      setErrorModal(true);
      setErrorModalText(err.message);
    },
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

    if (
      +weiToEth(accountTokenBalance as BigNumber, selectedToken.decimals) <
      selectedTokenAmount
    ) {
      setErrorModal(true);
      setErrorModalText(`Not enough ${selectedToken.symbol} balance`);
      return;
    }

    if (approveType == 3) {      
      SwapTokenToEth(signer, selectedToken, selectedTokenAmount.toString(), setErrorModal, setErrorModalText);
    } else {
      setupApprovalSteps();
      setShowApproveModal(true);
      SwapTokenToEth(signer, selectedToken, selectedTokenAmount.toString(), setErrorModal, setErrorModalText);
    }
  }

  useEffect(() => {
    getTopLiquidTokens();
  }, [loading]);

  useEffect(() => {
    getTopLiquidTokens();
  }, [loading]);

  return (
    <div className="flex justify-center mt-2 mb-2 ">
      <div className="items-center w-[35%] p-5 h-[40rem] bg-gray-200 rounded-2xl shadow-sm shadow-customLightBlue mt-2 max-sm:w-[95%] opacity-90">
        {showApproveModal ? (
          <ApproveTokenModal
            isSelectedTokenLoading={isTokenLoading}
            isZroLoading={isZroLoading}
            setShowApproveModal={setShowApproveModal}
            approveType={approveType}
            selectedTokenTxData={approveSelectedTokenData}
            zroTokenTxData={approveZroTokenData}
            isZroError={isZroError}
            isSelectedTokenError={isTokenError}
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
        <h2 className="text-center text-slate-800 text-3xl font-semibold">
          ERC20 To ETH Swap
        </h2>
        <div className="flex justify-center items-center ">
          <div className="flex items-center justify-center font-mono w-screen mt-6">
            <div className="bg-slate-800 w-[100%] rounded-xl shadow-xl p-4 max-sm:h-[90%]">
              <div className="flex items-center justify-between font-semibold text-xl text-customGreen px-2 ">
                <h1>Swap</h1>
                {!displayedTokens ? <SwapLoader /> : null}
              </div>
              <div className="flex justify-between text-customGreen bg-slate-200 rounded-xl text-3xl border border-[#D4DBE5] my-3 p-6 w-[1/4] max-sm:p-2">
                <div className="flex flex-col">
                  <input
                    type="number"
                    className="w-[90%] bg-transparent placeholder:text-customSkyBlue text-slate-900 outline-none text-2xl  max-sm:w-[56px]"
                    onChange={(e) =>
                      setSelectedTokenAmount(Number(e.target.value))
                    }
                  />
                  <span className="text-sm text-slate-900 font-bold">
                    Balance:{" "}
                    {weiToEth(
                      accountTokenBalance as BigNumber,
                      selectedToken?.decimals
                    )}
                  </span>
                </div>
                <div className="flex flex-row">
                  <div className="flex justify-end pr-1 max-sm:w-[1/4] max-sm:w-[55px] max-sm:h-[32px]">
                    <div
                      className="flex h-[39px] w-[91px] justify-center items-center bg-slate-800 rounded-xl text-lg cursor-pointer max-sm:text-xs max-sm:w-[55px] max-sm:rounded-xl max-sm:h-[32px] 
                      hover:bg-green-500 hover:text-slate-900 transition duration-300"
                      onClick={() => setShowModal(!showModal)}
                    >
                      Select
                    </div>
                  </div>
                  <div className="flex justify-end pr-1">
                    <select
                      className="flex h-min items-center bg-slate-800 rounded-xl text-lg text-center cursor-pointer p-2 max-sm:text-xs max-sm:w-[55px] max-sm:rounded-xl
                      hover:bg-green-500 hover:text-slate-900 transition duration-300"
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
              </div>
              <div className="flex justify-between bg-slate-200 rounded-xl text-3xl border border-[#D4DBE5] text-customDeepBlue my-3 p-6 max-sm:p-2">
                <input
                  type="number"
                  className="bg-transparent placeholder:text-slate-900 outline-none mb-6 w-full text-2xl"
                  placeholder="You GET"
                  value={(
                    Number(selectedTokenAmount) /
                    +formatBigNumberToNumber(
                      tokenValue as BigNumber[],
                      selectedToken?.decimals
                    )
                  ).toFixed(3)}
                  disabled
                />

                <div className="flex justify-end w-1/4 max-sm:w-3/4 max-sm:ml-[50px] ">
                  <div
                    className="flex justify-center w-[91px] h-[39px] items-center bg-slate-800 text-customGreen rounded-xl text-lg p-2 max-sm:text-xs max-sm:w-[55px]
                    max-sm:rounded-xl max-sm:h-[32px]"
                  >
                    ETH
                  </div>
                </div>
              </div>
              <p
                className="text-center mt-2 mb-2 cursor-pointer text-customGreen"
                onClick={() => addTokenToWallet(selectedToken, window.ethereum)}
              >
                {" "}
                Add token To Metamask{" "}
              </p>
              <ul className="text-center max-sm:text-sm">
                <li>
                  1 ETH ={" "}
                  {(+formatBigNumberToNumber(
                    tokenValue as BigNumber[],
                    selectedToken?.decimals
                  )).toFixed(2)}{" "}
                  {selectedToken?.symbol}
                </li>
                <li>
                  Total Supply:{" "}
                  {(+weiToEth(
                    selectedTokenSupply as BigNumber,
                    selectedToken?.decimals
                  )).toFixed(2)}
                </li>
                <li>
                  Total {selectedToken?.symbol} Burned:{" "}
                  {(+weiToEth(
                    totalBurned as BigNumber,
                    selectedToken?.decimals
                  )).toFixed(2)}
                </li>
              </ul>
              <div
                className="flex items-center justify-center cursor-pointer border rounded-xl bg-customGreen text-xl text-slate-900 font-semibold my-2 py-6 px-8  hover:bg-green-400 transition duration-400"
                onClick={() => {
                  if (selectedToken) {
                    swap(selectedToken);
                  } else {
                    setErrorModal(true);
                    setErrorModalText("No selected Token");
                  }
                }}
              >
                Swap
              </div>
              {errorModal ? (
                <ErrorModal
                  errorText={errorModalText}
                  setErrorModal={setErrorModal}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
