import { BaseInfo } from '../../components/Map/model'
import { useBaseInfo, useWorldTokenBalance } from '../../hooks/useInfo'
import { createContext } from 'react'

interface InfoContext extends BaseInfo {
    worldTokenBalance: number
}

const InfoContext = createContext<InfoContext>({
    basePrice: 0,
    splitRatio: 0,
    worldTokenBalance: 0,
})

// This context maintain 2 counters that can be used as a dependencies on other hooks to force a periodic refresh
const InfoContextProvider = ({ children }: any) => {
    const baseInfo = useBaseInfo()
    const worldTokenBalance = useWorldTokenBalance()

    return <InfoContext.Provider value={{
        basePrice: baseInfo.basePrice,
        splitRatio: baseInfo.splitRatio,
        worldTokenBalance,
    }}>
        {children}
    </InfoContext.Provider>
}

export { InfoContext, InfoContextProvider }