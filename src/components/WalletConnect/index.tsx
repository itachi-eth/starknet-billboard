import { Button, Box } from "@mui/material";
import { useStarknet } from "@starknet-react/core";
import truncateWalletAddress from "../../utils/truncateWalletAddress";

const WalletConnect: React.FC = () => {
    const { account, connect, connectors } = useStarknet();
    const connector = connectors[0]

    return (
        <Box>
            {
                account ? <Button onClick={() => window.location.reload()} variant="contained">
                    {truncateWalletAddress(account)}
                </Button> : <Button onClick={() => connect(connector)} variant="contained">
                    Connect Wallet
                </Button>
            }

        </Box>
    )
}

export default WalletConnect
