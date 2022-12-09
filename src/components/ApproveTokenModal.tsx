import { FC, useState } from "react";
interface ApproveTokenModalProps{
    isError:boolean,
    isSuccess:boolean,
    isLoading:boolean,
    setShowApproveModal:Function,
    text:string | undefined
}
const ApproveTokenModal: FC<ApproveTokenModalProps> = ({
  isError,
  isSuccess,
  isLoading,
  setShowApproveModal,
  text
}) => {

  return (
    <div className="absolute h-[20rem] w-[30%] top-[20rem] left-[520px] bg-customBlue z-2 border rounded-2xl	">
     <h2 className="text-center">Approve {text} token</h2>

     <div className="text-center mt-[16rem] cursor-pointer" >
      <p onClick={() => setShowApproveModal(false)}>Close</p></div>
    </div>
  );
};

export default ApproveTokenModal;
