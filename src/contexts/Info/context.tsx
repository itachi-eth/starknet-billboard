import { BaseInfo } from '../../components/Map/model'
import { useBaseInfo } from '../../hooks/useInfo'
import { createContext } from 'react'

interface InfoContext extends BaseInfo { }

const InfoContext = createContext<InfoContext>({
    basePrice: 0,
    splitRatio: 0
})

// This context maintain 2 counters that can be used as a dependencies on other hooks to force a periodic refresh
const InfoContextProvider = ({ children }: any) => {
    const baseInfo = useBaseInfo()

    return <InfoContext.Provider value={baseInfo}>
        {children}
    </InfoContext.Provider>
}

export { InfoContext, InfoContextProvider }