import { Token } from "../interfaces/ISwap";

export function checkIsTokenAlreadyExist(existedTokens:Token[] | undefined, currentToken: Token){

    return (!existedTokens?.find((existedToken:Token) => existedToken.id == currentToken.id))
}
export function objectStringify(token:Token | undefined){
    return JSON.stringify(token)
}

export function objectParse(token: string){
    return JSON.parse(token)
}

