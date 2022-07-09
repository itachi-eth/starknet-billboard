import { useStarknetInvoke } from "@starknet-react/core";
import { useStarknetContract } from "./useContract";

const useInvoke = (name: string, abi: any, method: string) => {
    const contract = useStarknetContract(name, abi)
    const { data, loading, error, reset, invoke } = useStarknetInvoke({
        contract,
        method,
    });

    return { data, loading, error, reset, invoke }
}

export default useInvoke
