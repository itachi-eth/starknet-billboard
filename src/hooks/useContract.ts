import { useContract } from "@starknet-react/core";
import { getContractAddress } from "../utils/addressHelpers";

export const useStarknetContract = (name: string, abi: any) => {
    const { contract } = useContract({
        abi,
        address: getContractAddress(name),
    });

    return contract
}

