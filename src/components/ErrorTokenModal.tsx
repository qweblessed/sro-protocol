import { FC } from "react";

interface ErrorModalProps{
  errorText:string;
  setErrorModal:Function;
}
const ErrorModal: FC<ErrorModalProps> = ({
  errorText,
  setErrorModal
}) => {

  return (
    <div className="absolute  w-[26rem] h-[10rem] right-0 bottom-0  bg-slate-800 z-2 border rounded-xl max-sm:w-[20rem]">
      <div className="flex justify-center">
        <h2 className="text-2xl text-customRed font-semibold text-center">Error</h2>
        <p className="absolute pl-[24rem] cursor-pointer"  onClick={() => setErrorModal(false)}>x</p>        
        </div>
       <p className="text-center mt-2 text-sm">{errorText}</p>
    </div>
  );
};

export default ErrorModal;
