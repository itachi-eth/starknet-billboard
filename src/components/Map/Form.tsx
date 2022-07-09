import React, { useState, useCallback } from "react"
import { FormProps } from "./model"
import { Button, Typography } from "@mui/material"
import { PopupLayout, StyledImageUploader } from "./elements"
import Image from "next/image"
import useAllowance from "../../hooks/useAllowance"
import useInvoke from "../../hooks/useInvoke"
import { create } from 'ipfs-http-client'
import { Box } from "@mui/system"
import CustomInput from "../Input"
import { InputAdornment } from "@mui/material"
import { FaTwitter } from "react-icons/fa"
import validator from "validator"
import { useStarknet } from "@starknet-react/core";
import { uint256, } from "starknet";
import { stringToFelt } from "../../utils/format"
import ResultDialog, { Action } from "../Dialog"
import { abis } from "../../config"
import { getContractAddress } from "../../utils/addressHelpers"
import { useBaseInfo } from "../../contexts/Info/hooks"

const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

const Form: React.FC<FormProps> = ({ info, setPopupInfo }) => {
    const { account } = useStarknet()
    const [twitterName, setTwitterName] = useState<string>("")
    const [validImage, setValidImage] = useState<boolean>(true)
    const [validTwitter, setValidTwitter] = useState<boolean>(true);
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [action, setAction] = useState<Action>("APPROVE")
    const worldTokenApproveInvoke = useInvoke('worldToken', abis['worldToken'], 'approve')
    const billlboardBidInvoke = useInvoke('billboard', abis['billboard'], 'bid')
    const billboardAddress = getContractAddress("billboard")
    const allowance = useAllowance()
    const { worldTokenBalance } = useBaseInfo()

    const [file, setFile] = useState<any>(null);
    const [buffer, setBuffer] = useState<any>(null);

    const validateAllFields = (field: string, fieldValue: string) => {
        if (field === 'twitter') {
            setTwitterName(fieldValue)
            if (validator.isLength(fieldValue, { min: 1, max: 50 })) {
                setValidTwitter(true)
            } else {
                setValidTwitter(false)
            }
        }


        if (field === 'image') {
            const maxAllowedSize = 5 * 1024 * 1024;
            if (Number(fieldValue) > maxAllowedSize) {
                setValidImage(false)
            } else {
                setValidImage(true)
            }
        }
    }

    const handleIsValid = (e: any, field: string) => {
        validateAllFields(field, e);
    }

    const captureFile = (event: any) => {
        event.preventDefault()
        const image = event.target.files[0]
        if (image) {
            handleIsValid(image.size, 'image')

            const urlReader = new window.FileReader()
            const bufferReader = new window.FileReader()
            urlReader.readAsDataURL(image)
            bufferReader.readAsArrayBuffer(image)

            urlReader.onload = (arg) => {
                setFile(arg.target?.result)
            }

            bufferReader.onloadend = () => {
                const arrayBuffer = new Uint8Array(bufferReader.result as ArrayBuffer)
                setBuffer(Buffer.from(arrayBuffer));
            }
        } else {
            setFile(null)
            setValidImage(false)
        }
    }

    const onSubmit = async (event: any) => {
        setAction("UPLOAD")
        billlboardBidInvoke.reset()
        event.preventDefault()
        setOpenDialog(true)

        const response = await ipfs.add(buffer) as any

        if (response) {
            setAction("BID")
            const hash = response.path as String
            const hash1 = hash.substring(0, hash.length / 2);
            const hash2 = hash.substring(hash.length / 2)

            billlboardBidInvoke.invoke({
                args: [
                    info.id,
                    stringToFelt(info.city),
                    stringToFelt(hash1),
                    stringToFelt(hash2),
                    stringToFelt(twitterName)
                ]
            })
        }
    }

    const handleApprove = useCallback(() => {
        worldTokenApproveInvoke.reset()
        const amount = uint256.bnToUint256(uint256.UINT_256_MAX)
        setOpenDialog(true)
        setAction("APPROVE")

        worldTokenApproveInvoke.invoke({
            args: [billboardAddress, amount],
        })

    }, [billboardAddress, worldTokenApproveInvoke])

    return (
        <>
            <PopupLayout>
                <Typography sx={{ fontSize: 20 }} color="primary" gutterBottom fontWeight={900}>Bid Form</Typography>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    mb: 1
                }}>
                    <Typography mr={1} color="primary" fontWeight={700}>City: </Typography>
                    <Typography color="text.secondary">{info.city}</Typography>
                </Box>

                <form onSubmit={onSubmit}>
                    <Box sx={{ marginBottom: "10px" }}>
                        <Box>
                            <Typography sx={{ mb: 1.5 }} color="primary" fontWeight={700}>* Twitter Username: (without @):</Typography>
                            <CustomInput
                                value={twitterName}
                                onChange={(e: any) => handleIsValid(e.currentTarget.value, "twitter")}
                                placeholder="Enter Twitter Name..."
                                startAdornment={
                                    <InputAdornment position="start">
                                        <FaTwitter style={{ color: "#0092e9", width: "18px", height: "18px" }} />
                                    </InputAdornment>
                                }
                                textcolor="#000000"
                                bgcolor="transparent"
                                margin="0px"
                            />
                        </Box>
                    </Box>

                    <Box sx={{ marginBottom: "10px" }}>
                        <Typography sx={{ mb: 1.5 }} color="primary" fontWeight={700}>* Upload Images:</Typography>
                        <StyledImageUploader
                            type="file"
                            name="img"
                            accept="image/*"
                            required
                            onChange={captureFile}
                        />
                        <Box sx={{ mt: 1.5 }}>
                            {file && <Image src={file} alt="board" width={150} height={100} />}
                        </Box>
                    </Box>

                    <Box sx={{
                        display: "flex",
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Button variant="outlined" disabled={allowance || !account} onClick={handleApprove}>Approve</Button>
                        <Button variant="contained" disabled={!account || !allowance} type="submit">Submit</Button>
                    </Box>

                    <Box>
                        {!account && !validImage && <Typography color="#dc3545" mt="5px" mb="5px">Sorry! Maximum Image Size is: 5MB</Typography>}

                        {!account && !validTwitter && <Typography color="#dc3545" mt="5px" mb="5px">Sorry! Please enter a valid twitter name</Typography>}

                        {account && worldTokenBalance === 0 && <Typography color="#dc3545" mt="5px" mb="5px">Sorry! You have no $WORLD</Typography>}
                    </Box>
                </form>
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

export default React.memo(Form)
