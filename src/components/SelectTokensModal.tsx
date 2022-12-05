import { FC } from "react";
import { ModalProps, Token } from "../interfaces/ISwapModal";
import { TokenCol } from "./TokenCol";
import { TokenRow } from "./TokenRow";

const SelectTokensModal: FC<ModalProps> = ({ tokens, setShowModal }) => {
  return (
    <div className="absolute h-[38rem] w-[24%] top-[10rem] left-[720px] bg-customBlue z-2 border rounded-2xl	">
      <div className="flex justify-between m-4  ">
        <div>
          <h2>Select a token</h2>
        </div>
        <div
          onClick={() => {
            setShowModal(false);
          }}
        >
          X
        </div>
      </div>
      <input
        type="number"
        className="w-[90%] bg-customDeepBlue outline-none p-2 ml-[5%] mr-[5%] border rounded-xl text-sm"
        placeholder="Paste address"
      />

      <div className="grid grid-cols-3 grid-rows-2 gap-2 col-span-2 place-items-center mt-4 ml-5 w-[90%]">
        {tokens?.map((item: Token) => {
          return <TokenCol key={item.id} token={item} />;
        })}
      </div>
      <div className="grid grid-row gap-1 place-items-center mt-5">
        {tokens?.map((item: Token) => {
          return <TokenRow key={item.id} token={item} />;
        })}
      </div>
    </div>
  );
};

export default SelectTokensModal;
