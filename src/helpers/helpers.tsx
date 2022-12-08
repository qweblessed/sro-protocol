import { Token } from "../interfaces/ISwap";

export function checkIsTokenAlreadyExist(existedTokens:Token[] | undefined, currentToken: Token){

    return (!existedTokens?.find((existedToken:Token) => existedToken.id == currentToken.id))
}