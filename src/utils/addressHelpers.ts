import addresses from "../config/constants/addresses";

export const getContractAddress = (name: string) => {
    return addresses[name]
}