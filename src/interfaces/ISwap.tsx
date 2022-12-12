export type Token = {
  decimals: string;
  id: string;
  name: string;
  symbol: string;
};

export type TokensResponse = {
  token0: {
    decimals: string;
    id: string;
    name: string;
    symbol: string;
  };
};

export interface ApproveTokenModalProps {
  isSelectedTokenLoading: boolean;
  isZroLoading: boolean;
  setShowApproveModal: Function;
  approveType: ApproveType | undefined;
  selectedTokenTxData: any;
  zroTokenTxData: any;
  isZroError: boolean;
  isSelectedTokenError: boolean;
  selectedTokenSymbol: string | undefined;
}
export enum ApproveStatus {
  waitingConfirmation = 0,
  pending = 1,
  succesed = 2,
}

export enum ApproveType  {
  approveForZro = 0,
  approveForSelected = 1,
  approveForZroAndSelected = 2,
  noNeedToApprove = 3
}