import { useState, useEffect, useCallback } from "react";
import { useStarknetContract } from "./useContract";
import { useStarknet, useStarknetCall } from "@starknet-react/core";
import { CityInfo } from "../components/Map/model";
import cities from "../config/constants/cities";
import { decodeToText, getBalanceNumber } from "../utils/format";
import { abis } from "../config";
import { useRefresh } from "../contexts/Refresh/hooks";
import { number, uint256 } from "starknet";

export const useCityInfo = () => {
    const [cityInfo, setCityInfo] = useState<CityInfo[]>([])
    const billboardContract = useStarknetContract('billboard', abis['billboard'])
    const { fastRefresh } = useRefresh()

    const fetch = useCallback(async () => {
        if (billboardContract) {
            try {
                const fetchedInfo = await Promise.all(
                    cities.map(async (city) => {
                        const [data] = await billboardContract.call(
                            "get_bill_board", [city.id]
                        )

                        const isBid = decodeToText(data['ipfsHash1']) !== "0"

                        return {
                            ...city,
                            isBid,
                            bidLevel: Number(decodeToText(data['bidLevel'])),
                            owner: number.toHex(data['owner']),
                            ipfsHash: decodeToText(data['ipfsHash1']) + decodeToText(data['ipfsHash2']),
                            twitter: decodeToText(data['twitter']),
                            bidPrice: getBalanceNumber(number.toBN(data['bidPrice']))
                        }
                    })
                )

                setCityInfo(fetchedInfo)
            } catch (error: any) {
                console.log("Failed to fetch all cities info " + error.message)
            }

        }
    }, [billboardContract])


    useEffect(() => {
        let mounted = true;
        if (mounted) {
            fetch()
        }
        return () => { mounted = false }
    }, [fetch, fastRefresh])

    return cityInfo
}

export const useWorldTokenBalance = () => {
    const worldTokenContract = useStarknetContract('worldToken', abis['worldToken'])
    const { account } = useStarknet()
    const { data } = useStarknetCall({
        contract: worldTokenContract,
        method: 'balanceOf',
        args: [account]
    })

    const tokenBalance = data && uint256.uint256ToBN(data[0])
    return tokenBalance ? getBalanceNumber(tokenBalance) : 0
}


