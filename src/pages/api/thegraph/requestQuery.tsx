import { apolloClient } from "../../_app";
import { INPUTED_TOKEN, PAIRS_QUERY } from "./queries";

type TokensResponse = {
  token0:{
    decimals:string,
    id:string,
    name:string,
    symbol:string
  }
}
type Token = {
    decimals:string,
    id:string,
    name:string,
    symbol:string
}

export const queryTopLiquidTokensReq = async () => {
  const response = await apolloClient.query({
    query: PAIRS_QUERY,
    fetchPolicy: "network-only",
  });
  const formattedTokens = response.data.pairs.map((item:TokensResponse) => {
    return item.token0
  })
  
  return formattedTokens
};

export const queryForSelectedTokenPair = async (address:string) => {
  const response = await apolloClient.query({
    query: INPUTED_TOKEN,
    fetchPolicy: "network-only",
    variables:{token:address}
  });

  return response.data.pairs[0].token0
};
