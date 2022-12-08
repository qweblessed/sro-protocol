import { FC, useState } from "react";
import { ModalProps, Token } from "../interfaces/ISwapModal";
import { TokenCol } from "./TokenCol";
import { TokenRow } from "./TokenRow";
import { queryForSelectedTokenPair } from "../pages/api/thegraph/requestQuery";

const SelectTokensModal: FC<ModalProps> = ({
  tokens,
  setShowModal,
  setSelectedToken,
  selectedToken,
  setDisplayedTokens
}) => {
  const [searchedToken, setSearchedToken] = useState<Token>();

  async function getSelectedToken(address: string) {
    setSearchedToken(await queryForSelectedTokenPair(address));
  }

  return (
    <div className="absolute h-[42rem] w-[24%] top-[10rem] left-[720px] bg-customBlue z-2 border rounded-2xl	">
      <div className="flex justify-between m-4  ">
        <div>
          <h2>Select a token</h2>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            setShowModal(false);
          }}
        >
          X
        </div>
      </div>
      <input
        type="text"
        className="w-[90%] bg-customDeepBlue outline-none p-2 ml-[5%] mr-[5%] border rounded-xl text-sm"
        placeholder="Paste address"
        onChange={(e) => {
          if (/^0x[a-fA-F0-9]{40}$/g.test(e.target.value)) {
   
            getSelectedToken(e.target.value);
          }
        }}
      />

      <div className="grid grid-cols-3 grid-rows-2 gap-2 col-span-2 place-items-center mt-4 ml-5 w-[90%]">
        {tokens?.slice(0,7)?.map((item: Token) => {
          return (
            <TokenCol
              key={item.id}
              token={item}
              setSelectedToken={setSelectedToken}
              selectedToken={selectedToken}
              displayedTokens={tokens}
            />
          );
        })}
      </div>
      <div className="grid grid-row gap-1 place-items-center mt-4">
        {!searchedToken ? (
          tokens?.slice(0,7)?.map((item: Token) => {
            return (
              <TokenRow
                key={item.id}
                token={item}
                setSelectedToken={setSelectedToken}
                selectedToken={selectedToken}
                setDisplayedTokens={setDisplayedTokens}
                displayedTokens={tokens}
              />
            );
          })
        ) : (
          <TokenRow
            token={searchedToken}
            setSelectedToken={setSelectedToken}
            selectedToken={selectedToken}
            setDisplayedTokens={setDisplayedTokens}        
            displayedTokens={tokens}
          />
        )}
      </div>
      <div className="flex justify-center mt-5  ">
        <button
          className="w-[200px] border rounded-2xl "
          onClick={() => {
            setShowModal(false);
          }}
        >
          Select token
        </button>
      </div>
    </div>
  );
};

export default SelectTokensModal;
