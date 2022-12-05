export type Token = {
    decimals: string;
    id: string;
    name: string;
    symbol: string;
  };

export interface TokenProps {
    token: Token
}
export interface ModalProps {
    tokens: Token[] | undefined;
    setShowModal: Function;
}