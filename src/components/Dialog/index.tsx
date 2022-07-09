import React, { useState, useEffect } from "react"
import { Box, Dialog, CircularProgress, Typography } from "@mui/material";
import { IconContainer, CloseButton } from "./elements";
import { FaTimes } from "react-icons/fa"
import { BiErrorCircle } from "react-icons/bi"
import { FaCheckCircle } from "react-icons/fa"
import { LinkEnternal } from "../Link";
import { useTransactionManager } from "../../hooks/useTransactions";
import { getTranscationHash } from "../../utils/getChainInfo";

export type Action = 'BID' | 'APPROVE' | 'MINT' | 'UPLOAD'
export type Result = 'PENDING' | 'ACCEPTED' | 'REJECTED'

interface Props {
    city: string,
    open: boolean,
    action: Action,
    handleClose: () => void,
}

const ResultDialog: React.FC<Props> = ({ city, open, handleClose, action }) => {
    const { loadingMessage, successMessage, errorMessage, result, transactionHash } = useTransactionManager(action, city)
    console.log(">>>>>>result", result)

    let comp;

    if (result === "ACCEPTED") {
        comp = <Box sx={{
            display: "flex",
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        }}>
            <IconContainer color="#28a745">
                <FaCheckCircle />
            </IconContainer>
            <Typography sx={{ fontSize: 20, marginTop: "10px" }} color="text.secondary">{successMessage}</Typography>
            {transactionHash && <LinkEnternal href={getTranscationHash(transactionHash)} text={"View on Voyager"} />}
        </Box>
    } else if (result === "REJECTED") {
        comp = <Box sx={{
            display: "flex",
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        }}>
            <IconContainer color="#dc3545">
                <BiErrorCircle />
            </IconContainer>
            <Typography sx={{ fontSize: 20, marginTop: "10px" }} color="text.secondary">{errorMessage}</Typography>
        </Box>
    } else {
        comp = <Box sx={{
            display: "flex",
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        }}>
            <CircularProgress size={50} />
            <Typography sx={{ fontSize: 20, marginTop: "10px" }} color="text.secondary">{loadingMessage}</Typography>
        </Box>
    }

    return (
        <Dialog
            open={open}
            onClose={(event, reason) => {
                if (reason !== 'backdropClick') {
                    handleClose();
                }
            }}
        >
            <CloseButton
                onClick={() => {
                    handleClose()
                }}>
                <FaTimes />
            </CloseButton>

            <Box sx={{
                display: "flex",
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                minWidth: "300px",
                minHeight: "300px"
            }}>
                {comp}
            </Box>
        </Dialog>
    )
}

export default ResultDialog