export type Token = {
    decimals: string;
    id: string;
    name: string;
    symbol: string;
  };

export interface TokenProps {
    token: Token;
    setSelectedToken: Function;
    selectedToken: Token | undefined;
    setDisplayedTokens?: Function;
    displayedTokens: Token[] | undefined;
}
export interface ModalProps {
    tokens: Token[] | undefined;
    setShowModal: Function;
    setSelectedToken: Function;
    setDisplayedTokens: Function;
    selectedToken: Token | undefined;
}