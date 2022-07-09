import { useEffect, useState } from "react";
import { useStarknetCall, useStarknet } from "@starknet-react/core";
import { useStarknetContract } from "./useContract";
import { getContractAddress } from "../utils/addressHelpers";
import { abis } from "../config";
import { uint256 } from "starknet";

const useAllowance = () => {
    const [allowance, setAllowance] = useState(false)
    const worldTokenContract = useStarknetContract("worldToken", abis['worldToken'])
    const billboardAddress = getContractAddress("billboard")
    const { account } = useStarknet();
    const { data } = useStarknetCall({
        contract: worldTokenContract,
        method: "allowance",
        args: [account, billboardAddress]
    });

    const remaining = data && uint256.uint256ToBN(data[0])

    useEffect(() => {
        if (Number(remaining) > 10000) {
            setAllowance(true)
        } else {
            setAllowance(false)
        }
    }, [remaining])

    return allowance
}

export default useAllowance