import React from 'react'
import { RefreshContextProvider } from './contexts/Refresh/context'
import { InfoContextProvider } from './contexts/Info/context'
import { StarknetProvider, getInstalledInjectedConnectors } from "@starknet-react/core";

interface Props {
    children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
    const connectors = getInstalledInjectedConnectors();

    return (
        <StarknetProvider connectors={connectors}>
            <RefreshContextProvider>
                <InfoContextProvider>
                    {children}
                </InfoContextProvider>
            </RefreshContextProvider>
        </StarknetProvider>
    )
}

export default Providers