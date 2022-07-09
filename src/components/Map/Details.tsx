import React, { useCallback, useState } from "react"
import { PopupLayout, TwitterLink } from "./elements"
import { FormProps } from "./model"
import { Typography, Button } from "@mui/material"
import Image from "next/image"
import { Box } from "@mui/system"
import truncateWalletAddress from "../../utils/truncateWalletAddress"
import { useStarknet } from "@starknet-react/core"
import { useBaseInfo } from "../../contexts/Info/hooks"
import { FaTwitter } from "react-icons/fa"
import useInvoke from "../../hooks/useInvoke"
import { abis } from "../../config"
import ResultDialog, { Action } from "../Dialog"

const Details: React.FC<FormProps> = ({ info, setShowForm, setPopupInfo }) => {
    const { id, ipfsHash, bidLevel, owner, twitter, city } = info;
    const { account } = useStarknet()
    const { basePrice, splitRatio } = useBaseInfo()
    const [action, setAction] = useState<Action>("MINT")
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const collectionMintInvoke = useInvoke('collection', abis['collection'], 'mint')

    const mint = useCallback(() => {
        if (account === owner) {
            collectionMintInvoke.reset()
            setOpenDialog(true)
            setAction("MINT")
            collectionMintInvoke.invoke({
                args: [id],
            })
        }
    }, [collectionMintInvoke, account, owner, id])

    return (
        <>
            <PopupLayout>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <Image src={`https://ipfs.infura.io/ipfs/${ipfsHash}`} alt={info.city} width={100} height={75} />
                    <Box sx={{
                        display: "flex",
                        alignItems: "start",
                        flexDirection: "column",
                        justifyContent: "center",
                        margin: "10px",
                    }}>

                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 1.5
                        }}>
                            <Typography mr={1} color="text.secondary">City:</Typography>
                            <Typography color="text.secondary">{city}</Typography>
                        </Box>

                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 1.5
                        }}>
                            <Typography mr={1} color="text.secondary">Owner:</Typography>
                            {owner && <Typography color="text.secondary">{truncateWalletAddress(owner)}</Typography>}
                        </Box>

                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 1.5
                        }}>
                            <Typography mr={1} color="text.secondary">Twitter:</Typography>

                            {
                                twitter && <TwitterLink href={`https://twitter.com/${twitter}`} target="_blank">
                                    <Box sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        <FaTwitter style={{ color: "#0092e9", width: "18px", height: "18px" }} />
                                        <Typography color="text.secondary">@{twitter}</Typography>
                                    </Box>
                                </TwitterLink>
                            }

                        </Box>

                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 1.5
                        }}>
                            <Typography sx={{ mr: 1.5 }} color="text.secondary">Bid Level: </Typography>
                            <Typography color="text.secondary">Level {bidLevel?.toString()}</Typography>
                        </Box>

                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 1.5
                        }}>
                            <Typography sx={{ mr: 1.5 }} color="text.secondary">Bid Price: </Typography>
                            <Typography color="text.secondary">{basePrice * Number(bidLevel)} World Token</Typography>
                        </Box>

                        <Box sx={{
                            display: "flex",
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: "100%"
                        }}>
                            <Button variant="outlined" disabled={!account} onClick={() => setShowForm(true)}>Bid</Button>
                            <Button variant="contained" disabled={!account || account !== owner} onClick={mint}>Mint</Button>
                        </Box>
                    </Box>
                </Box>
            </PopupLayout>

            <ResultDialog
                open={openDialog}
                handleClose={() => setOpenDialog(false)}
                city={info.city}
                action={action}
            />
        </>
    )
}

export default Details