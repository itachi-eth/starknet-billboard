import React from 'react'
import { ThemeProvider } from '@mui/material'
import { RefreshContextProvider } from './contexts/Refresh/context'
import { InfoContextProvider } from './contexts/Info/context'
import { StarknetProvider, getInstalledInjectedConnectors } from "@starknet-react/core";
import theme from './theme'

interface Props {
    children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
    const connectors = getInstalledInjectedConnectors();

    return (
        <StarknetProvider connectors={connectors}>
            <RefreshContextProvider>
                <ThemeProvider theme={theme}>
                    <InfoContextProvider>
                        {children}
                    </InfoContextProvider>
                </ThemeProvider>
            </RefreshContextProvider>
        </StarknetProvider>
    )
}

export default Providers