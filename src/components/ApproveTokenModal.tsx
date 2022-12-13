import { FC, useEffect, useState } from "react";
import { ApproveStatus, ApproveTokenModalProps } from "../interfaces/ISwap";

const ApproveTokenModal: FC<ApproveTokenModalProps> = ({
  isSelectedTokenLoading,
  isZroLoading,
  isSelectedTokenError,
  isZroError,
  setShowApproveModal,
  approveType,
  selectedTokenTxData,
  zroTokenTxData,
  selectedTokenSymbol,
}) => {
  const [tokenTxStatus, setTokenTxStatus] = useState<ApproveStatus>(0);
  const [zroTxStatus, setZroTxStatus] = useState<ApproveStatus>(0);

  const handleTxStatus = async (functionData: any, isLoading: boolean) => {
    if (isLoading) {
      setTokenTxStatus(0);
      return;
    }
    setTokenTxStatus(1);
    await functionData?.wait().then(() => {
      setTokenTxStatus(2);
    });
  };

  const handleZroTxStatus = async (
    functionData: any,
    isZroLoading: boolean
  ) => {
    if (isZroLoading) {
      setZroTxStatus(0);
      return;
    }
    setZroTxStatus(1);
    await functionData?.wait().then(() => {
      setZroTxStatus(2);
    });
  };

  useEffect(() => {
    if (approveType == 0) {
      handleZroTxStatus(zroTokenTxData, isZroLoading);
    }
    if (approveType == 1) {
      handleTxStatus(selectedTokenTxData, isSelectedTokenLoading);
    }
    if (approveType == 2) {
      handleZroTxStatus(zroTokenTxData, isZroLoading);
      handleTxStatus(selectedTokenTxData, isSelectedTokenLoading);
    }
    if (approveType == 3) {
      setShowApproveModal(false);
    }
  }, [approveType, isZroLoading, isSelectedTokenLoading]);


  return (
    <div className="absolute h-[20rem] w-[30%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 z-2 border rounded-2xl pt-4 max-sm:w-[70%]">
      {approveType == 2 ? (
        <h2 className="text-center text-2xl text-slate-800 pb-3 max-sm:text-sm font-semibold">
          Approve {selectedTokenSymbol} & ZRO
        </h2>
      ) : approveType == 1 ? (
        <h2 className="text-center text-2xl text-slate-800 pb-3 max-sm:text-sm font-semibold">
          Approve {selectedTokenSymbol}
        </h2>
      ) : approveType == 0 ? (
        <h2 className="text-center text-2xl text-slate-800 pb-3 max-sm:text-sm font-semibold">
          Approve ZRO
        </h2>
      ) : null}

      {approveType === 0 && !isZroError ? (
        <div>
          <p
            className={
              zroTxStatus == 0
                ? "animate-pulse text-3xl text-slate-700 text-center pt-5"
                : zroTxStatus > 0
                ? "text-3xl text-customGreen text-center pt-5 "
                : "text-3xl text-customRed text-center pt-5"
            }
          >
            Accept Approve
          </p>
          <p
            className={
              zroTxStatus == 1
                ? "animate-pulse text-3xl text-slate-700 text-center pt-5"
                : zroTxStatus > 1
                ? "text-3xl text-customGreen text-center pt-5"
                : "text-3xl text-customRed text-center pt-5"
            }
          >
            Pending Approve
          </p>
          <p
            className={
              zroTxStatus == 2
                ? "text-3xl text-customGreen text-center pt-5"
                : "text-3xl text-customRed text-center pt-5"
            }
          >
            Approved
          </p>
        </div>
      ) : null}
      {approveType === 1 && !isSelectedTokenError ? (
        <div>
          <p
            className={
              tokenTxStatus == 0
                ? "animate-pulse text-3xl text-customSkyBlue text-center pt-5 max-sm:text-sm"
                : tokenTxStatus > 0
                ? "text-3xl text-customGreen text-center pt-5 max-sm:text-sm"
                : "text-3xl text-customPaleBlue text-center pt-5 max-sm:text-sm"
            }
          >
            Accept Approve
          </p>
          <p
            className={
              tokenTxStatus == 1
                ? "animate-pulse text-3xl text-customSkyBlue text-center pt-5 max-sm:text-sm"
                : tokenTxStatus > 1
                ? "text-3xl text-customGreen text-center pt-5 max-sm:text-sm"
                : "text-3xl text-customPaleBlue text-center pt-5 max-sm:text-sm"
            }
          >
            Pending Approve
          </p>
          <p
            className={
              tokenTxStatus == 2
                ? "text-3xl text-customGreen text-center pt-5 max-sm:text-sm"
                : "text-3xl text-customPaleBlue text-center pt-5 max-sm:text-sm"
            }
          >
            Approved
          </p>
        </div>
      ) : null}
      {approveType === 2 && !isSelectedTokenError && !isZroError ? (
        <div className="flex justify-around">
          <div>
            <p
              className={
                tokenTxStatus == 0
                  ? "animate-pulse text-3xl text-slate-700 text-center pt-5 max-sm:text-sm"
                  : tokenTxStatus > 0
                  ? "text-3xl text-customGreen text-center pt-5 max-sm:text-sm"
                  : "text-3xl text-customRed text-center pt-5 max-sm:text-sm"
              }
            >
              Accept {selectedTokenSymbol}
            </p>
            <p
              className={
                tokenTxStatus == 1
                  ? "animate-pulse text-3xl text-customSkyBlue text-center pt-5 max-sm:text-sm"
                  : tokenTxStatus > 1
                  ? "text-3xl text-customGreen text-center pt-5 max-sm:text-sm"
                  : "text-3xl text-customRed text-center pt-5 max-sm:text-sm"
              }
            >
              Pending {selectedTokenSymbol}
            </p>
            <p
              className={
                tokenTxStatus == 2
                  ? "text-3xl text-customGreen text-center pt-5 max-sm:text-sm"
                  : "text-3xl text-customRed text-center pt-5 max-sm:text-sm"
              }
            >
              Approved {selectedTokenSymbol}
            </p>
          </div>
          <div>
            <p
              className={
                zroTxStatus == 0
                  ? "animate-pulse text-3xl text-slate-700 text-center pt-5 max-sm:text-sm"
                  : zroTxStatus > 0
                  ? "text-3xl text-customGreen text-center pt-5 max-sm:text-sm"
                  : "text-3xl text-customRed text-center pt-5 max-sm:text-sm"
              }
            >
              Accept ZRO
            </p>
            <p
              className={
                zroTxStatus == 1
                  ? "animate-pulse text-3xl text-customSkyBlue text-center pt-5 max-sm:text-sm"
                  : zroTxStatus > 1
                  ? "text-3xl text-customGreen text-center pt-5 max-sm:text-sm"
                  : "text-3xl text-customRed text-center pt-5 max-sm:text-sm"
              }
            >
              Pending ZRO
            </p>
            <p
              className={
                zroTxStatus == 2
                  ? "text-3xl text-customGreen text-center pt-5 max-sm:text-sm"
                  : "text-3xl text-customRed text-center pt-5 max-sm:text-sm"
              }
            >
              Approved ZRO
            </p>
          </div>
        </div>
      ) : null}
      <div className="pt-[50px] ">
        {isZroError ? (
          <div className="text-center text-4xl text-customRed max-sm:text-sm">
            ZRO Approve Failed
          </div>
        ) : null}
        {isSelectedTokenError ? (
          <div className="text-center  text-4xl text-customRed max-sm:text-sm">
            {selectedTokenSymbol} Approve Failed
          </div>
        ) : null}
      </div>
      <div className="text-center cursor-pointer max-sm:mt-[3rem]">
        <button
          onClick={() => setShowApproveModal(false)}
          className="bg-slate-800 w-[8rem] h-[2rem] rounded-lg text-customGreen hover:bg-slate-600 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ApproveTokenModal;
