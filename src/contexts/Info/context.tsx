import { useState } from 'react'
import { Action } from '../../components/Dialog'
import { useWorldTokenBalance } from '../../hooks/useInfo'
import { createContext } from 'react'

interface InfoContext {
    worldTokenBalance: number,
    action: Action,
    onSetAction: (action: Action) => void,
    open: boolean,
    handleDialog: (open: boolean) => void,
    selectedCity: string,
    onSetSelectedCity: (city: string) => void,
    latestTransactionHash: string,
    onSetLatestTransactionHash: (hash: string) => void
}

const InfoContext = createContext<InfoContext>({
    worldTokenBalance: 0,
    action: "APPROVE",
    onSetAction: () => { },
    open: false,
    handleDialog: () => { },
    selectedCity: '',
    onSetSelectedCity: () => { },
    latestTransactionHash: '',
    onSetLatestTransactionHash: () => { }
})

// This context maintain 2 counters that can be used as a dependencies on other hooks to force a periodic refresh
const InfoContextProvider = ({ children }: any) => {
    const worldTokenBalance = useWorldTokenBalance()
    const [action, setAction] = useState<Action>("APPROVE")
    const [open, setOpenDialog] = useState<boolean>(false)
    const [selectedCity, setSelectedCity] = useState<string>("")
    const [latestTransactionHash, setLatestTransactionHash] = useState<string>("")

    const onSetAction = (action: Action) => setAction(action)
    const handleDialog = (open: boolean) => setOpenDialog(open)
    const onSetSelectedCity = (city: string) => setSelectedCity(city)
    const onSetLatestTransactionHash = (hash: string) => setLatestTransactionHash(hash)

    return <InfoContext.Provider value={{
        worldTokenBalance,
        action,
        onSetAction,
        open,
        handleDialog,
        selectedCity,
        onSetSelectedCity,
        latestTransactionHash,
        onSetLatestTransactionHash,
    }}>
        {children}
    </InfoContext.Provider>
}

export { InfoContext, InfoContextProvider }