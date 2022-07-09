import { number, shortString } from "starknet";
import BigNumber from 'bignumber.js'

export const stringToFelt = (text: string) => number.toFelt(shortString.encodeShortString(text))

export const decodeToText = (bn: any) => shortString.decodeShortString(number.toHex(bn))

export const getBalanceNumber = (balance: BigNumber, decimals = 18) => {
    const displayBalance = new BigNumber(balance).dividedBy(new BigNumber(10).pow(decimals))
    return displayBalance.toNumber()
}