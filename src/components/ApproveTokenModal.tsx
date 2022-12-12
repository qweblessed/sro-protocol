import Image from "next/image";
import { FC, useEffect, useState } from "react";
import zero_logo from "../assets/header/logo.png";
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
  }, [approveType, isZroLoading, isSelectedTokenLoading]);


  return (
    <div className="absolute h-[20rem] w-[30%] top-[20rem] left-[520px] bg-customBlue z-2 border rounded-2xl	pt-4">
      {approveType == 2 ? (
        <h2 className="text-center text-2xl text-customSkyBlue pb-3">
          Approve {selectedTokenSymbol}
        </h2>
      ) : approveType == 1 ? (
        <h2 className="text-center text-2xl text-customSkyBlue pb-3">
          Approve {selectedTokenSymbol}
        </h2>
      ) : approveType == 0 ? (
        <h2 className="text-center text-2xl text-customSkyBlue pb-3">
          Approve ZRO
        </h2>
      ) : null}

      {approveType === 0 && !isZroError ? (
        <div>
          <p
            className={
              zroTxStatus == 0
                ? "animate-pulse text-3xl text-customSkyBlue text-center pt-5"
                : zroTxStatus > 0
                ? "text-3xl text-customGreen text-center pt-5"
                : "text-3xl text-customPaleBlue text-center pt-5"
            }
          >
            Accept Approve
          </p>
          <p
            className={
              zroTxStatus == 1
                ? "animate-pulse text-3xl text-customSkyBlue text-center pt-5"
                : zroTxStatus > 1
                ? "text-3xl text-customGreen text-center pt-5"
                : "text-3xl text-customPaleBlue text-center pt-5"
            }
          >
            Pending Approve
          </p>
          <p
            className={
              zroTxStatus == 2
                ? "text-3xl text-customGreen text-center pt-5"
                : "text-3xl text-customPaleBlue text-center pt-5"
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
                ? "animate-pulse text-3xl text-customSkyBlue text-center pt-5"
                : tokenTxStatus > 0
                ? "text-3xl text-customGreen text-center pt-5"
                : "text-3xl text-customPaleBlue text-center pt-5"
            }
          >
            Accept Approve
          </p>
          <p
            className={
              tokenTxStatus == 1
                ? "animate-pulse text-3xl text-customSkyBlue text-center pt-5"
                : tokenTxStatus > 1
                ? "text-3xl text-customGreen text-center pt-5"
                : "text-3xl text-customPaleBlue text-center pt-5"
            }
          >
            Pending Approve
          </p>
          <p
            className={
              tokenTxStatus == 2
                ? "text-3xl text-customGreen text-center pt-5"
                : "text-3xl text-customPaleBlue text-center pt-5"
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
                  ? "animate-pulse text-3xl text-customSkyBlue text-center pt-5"
                  : tokenTxStatus > 0
                  ? "text-3xl text-customGreen text-center pt-5"
                  : "text-3xl text-customPaleBlue text-center pt-5"
              }
            >
              Accept {selectedTokenSymbol}
            </p>
            <p
              className={
                tokenTxStatus == 1
                  ? "animate-pulse text-3xl text-customSkyBlue text-center pt-5"
                  : tokenTxStatus > 1
                  ? "text-3xl text-customGreen text-center pt-5"
                  : "text-3xl text-customPaleBlue text-center pt-5"
              }
            >
              Pending {selectedTokenSymbol}
            </p>
            <p
              className={
                tokenTxStatus == 2
                  ? "text-3xl text-customGreen text-center pt-5"
                  : "text-3xl text-customPaleBlue text-center pt-5"
              }
            >
              Approved {selectedTokenSymbol}
            </p>
          </div>
          <div>
            <p
              className={
                zroTxStatus == 0
                  ? "animate-pulse text-3xl text-customSkyBlue text-center pt-5"
                  : zroTxStatus > 0
                  ? "text-3xl text-customGreen text-center pt-5"
                  : "text-3xl text-customPaleBlue text-center pt-5"
              }
            >
              Accept ZRO
            </p>
            <p
              className={
                zroTxStatus == 1
                  ? "animate-pulse text-3xl text-customSkyBlue text-center pt-5"
                  : zroTxStatus > 1
                  ? "text-3xl text-customGreen text-center pt-5"
                  : "text-3xl text-customPaleBlue text-center pt-5"
              }
            >
              Pending ZRO
            </p>
            <p
              className={
                zroTxStatus == 2
                  ? "text-3xl text-customGreen text-center pt-5"
                  : "text-3xl text-customPaleBlue text-center pt-5"
              }
            >
              Approved ZRO
            </p>
          </div>
        </div>
      ) : null}
      <div className="pt-[50px] pb-[50px]">
        {isZroError ? (
          <div className="text-center text-4xl text-customRed">
            ZRO Approve Failed
          </div>
        ) : null}
        {isSelectedTokenError ? (
          <div className="text-center text-4xl text-customRed">
            {selectedTokenSymbol} Approve Failed
          </div>
        ) : null}
      </div>
      <div className="text-center mt-[2rem] cursor-pointer">
        <button
          onClick={() => setShowApproveModal(false)}
          className="bg-customSkyBlue w-[8rem] h-[2rem] rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ApproveTokenModal;
