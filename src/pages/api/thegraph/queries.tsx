import { gql } from "@apollo/client";

export const PAIRS_QUERY = gql`
  query MyQuery {
    pairs(
      first: 7
      where: { token1: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2" }
      orderBy: reserve1
      orderDirection: desc
    ) {
      id
      token0 {
        name
        symbol
        decimals
        id
      }
    }
  }
`;

export const INPUTED_TOKEN = gql`
query getCetrainToken($token: String!) {
  pairs(
    where: {
      token1: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
      token0: $token
    }
  ) {
    id
    token0 {
      id
      name
      symbol
      decimals
    }
  }
}
`;