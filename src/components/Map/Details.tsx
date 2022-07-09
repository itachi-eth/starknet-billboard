import React from "react"
import { PopupLayout, TwitterLink } from "./elements"
import md5 from "md5"
import { create } from 'ipfs-http-client'
import { FormProps } from "./model"
import { Typography, Button } from "@mui/material"
import Image from "next/image"
import { Box } from "@mui/system"
import truncateWalletAddress from "../../utils/truncateWalletAddress"
import { stringToFelt } from "../../utils/format"
import { useStarknet } from "@starknet-react/core"
import { useInfo } from "../../contexts/Info/hooks"
import { FaTwitter } from "react-icons/fa"
import useInvoke from "../../hooks/useInvoke"
import { abis } from "../../config"
import { useStarknetTransactionManager } from "@starknet-react/core"

const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

export interface Trait {
    attributes: Attribute[];
    image: string;
    description: string;
    name: string;
    id?: string;
}

interface Attribute {
    trait_type: string;
    value: string;
}

const Details: React.FC<FormProps> = ({ info, setShowForm, setPopupInfo }) => {
    const { id, ipfsHash, bidLevel, owner, twitter, city, bidPrice } = info;
    const { account } = useStarknet()
    const { worldTokenBalance, handleDialog, onSetAction, latestTransactionHash } = useInfo()
    const collectionMintInvoke = useInvoke('collection', abis['collection'], 'mint')
    const { removeTransaction } = useStarknetTransactionManager()

    const mint = async () => {
        if (account === owner) {
            setPopupInfo(null)
            setShowForm(false)
            collectionMintInvoke.reset()
            handleDialog(true)
            onSetAction("MINT")
            removeTransaction(latestTransactionHash)

            const string = ipfsHash + city + owner + bidLevel + bidPrice
            const uniqueIdentifier = md5(string).slice(0, 7)

            const trait: Trait = {
                attributes: [
                    {
                        trait_type: "Bid Level",
                        value: String(bidLevel)
                    },
                    {
                        trait_type: "City",
                        value: city
                    },
                    {
                        trait_type: "Twitter",
                        value: String(twitter),
                    },
                    {
                        trait_type: "Bid Price",
                        value: `${Number(bidPrice)} $WORLD`
                    },

                ],
                image: `https://ipfs.infura.io/ipfs/${ipfsHash}`,
                description: "NFT from Starknet World Map Billboard",
                name: `Billboard NFT #${uniqueIdentifier}`
            }

            const response = await ipfs.add(Buffer.from(JSON.stringify(trait))) as any;

            if (response) {
                const hash = response.path as String
                const baseTokenURI = stringToFelt("https://ipfs.infura.io/ipfs/")
                const hash1 = stringToFelt(hash.substring(0, hash.length / 2));
                const hash2 = stringToFelt(hash.substring(hash.length / 2))
                const tokenURIs = [baseTokenURI, hash1, hash2]

                collectionMintInvoke.invoke({
                    args: [id, tokenURIs],
                })
            }
        }
    }

    return (
        <>
            <PopupLayout>
                <Box sx={{
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "space-between"
                }}>
                    <Image src={`https://ipfs.infura.io/ipfs/${ipfsHash}`} alt={info.city} width={200} height={150} />
                    <Box sx={{
                        display: "flex",
                        alignItems: "start",
                        flexDirection: "column",
                        justifyContent: "center",
                        margin: "0 10px",
                    }}>

                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 1
                        }}>
                            <Typography mr={1} color="primary" fontWeight={700} fontSize="18px">City:</Typography>
                            <Typography color="text.secondary">{city}</Typography>
                        </Box>

                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 1
                        }}>
                            <Typography mr={1} color="primary" fontWeight={700} fontSize="18px">Owner:</Typography>
                            {owner && <Typography color="text.secondary">{truncateWalletAddress(owner)}</Typography>}
                        </Box>

                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 1
                        }}>
                            <Typography mr={1} color="primary" fontWeight={700} fontSize="18px">Twitter:</Typography>

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
                            mb: 1
                        }}>
                            <Typography mr={1} color="primary" fontWeight={700} fontSize="18px">Bid Level: </Typography>
                            <Typography color="text.secondary">Level {bidLevel?.toString()}</Typography>
                        </Box>

                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 1.5
                        }}>
                            <Typography sx={{ mr: 1.5 }} color="primary" fontWeight={700} fontSize="18px">Bid Price: </Typography>
                            <Typography color="text.secondary">{bidPrice} $WORLD</Typography>
                        </Box>

                        <Box sx={{
                            display: "flex",
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: "100%"
                        }}>
                            <Button variant="outlined" disabled={!account || worldTokenBalance < Number(bidPrice)} onClick={() => setShowForm(true)}>Bid</Button>
                            <Button variant="contained" disabled={!account || account !== owner} onClick={mint}>Mint</Button>
                        </Box>
                    </Box>
                </Box>
            </PopupLayout>
        </>
    )
}

export default Details