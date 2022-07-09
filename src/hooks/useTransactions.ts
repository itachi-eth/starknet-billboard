import { useState, useEffect } from "react";
import { Action, Result } from "../components/Dialog";
import { useStarknetTransactionManager } from "@starknet-react/core";
import { useInfo } from "../contexts/Info/hooks";

export const useTransaction = () => {
    const { transactions } = useStarknetTransactionManager();
    if (transactions === undefined || transactions.length === 0) return null
    return transactions[transactions.length - 1]
}

export const useTransactionManager = (action: Action, city: string) => {
    const [loadingMessage, setLoadingMessage] = useState<string>("")
    const [successMessage, setSuccessMessage] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")
    const { onSetLatestTransactionHash } = useInfo()
    const [result, setResult] = useState<Result>("PENDING")
    const transaction = useTransaction();

    useEffect(() => {
        setResult("PENDING")
        setLoadingMessage("")
        setSuccessMessage("")
        setErrorMessage("")

        if (action === "APPROVE") {
            setLoadingMessage("Approving WORLD Token...")
            if (transaction) {
                onSetLatestTransactionHash(transaction.transactionHash)
                if (transaction.status === "ACCEPTED_ON_L1" || transaction.status === "ACCEPTED_ON_L2") {
                    setResult("ACCEPTED")
                    setSuccessMessage('Successfully approve WORLD Token')
                } else if (transaction.status === "REJECTED" || transaction.status === "NOT_RECEIVED") {
                    setResult("REJECTED")
                    setErrorMessage("Failed to approve WORLD Token")
                } else {
                    setResult("PENDING")
                }
            }
        } else if (action === "BID") {
            setLoadingMessage("Billboard Form Submitting...")
            if (transaction) {
                onSetLatestTransactionHash(transaction.transactionHash)
                if (transaction.status === "ACCEPTED_ON_L1" || transaction.status === "ACCEPTED_ON_L2") {
                    setResult("ACCEPTED")
                    setSuccessMessage(`Successfully bid ${city}`)
                } else if (transaction.status === "REJECTED" || transaction.status === "NOT_RECEIVED") {
                    setResult("REJECTED")
                    setErrorMessage(`Failed to bid ${city}`)
                } else {
                    setResult("PENDING")
                }
            }
        } else if (action === "MINT") {
            setLoadingMessage("Minting NFT...")
            if (transaction) {
                onSetLatestTransactionHash(transaction.transactionHash)
                if (transaction.status === "ACCEPTED_ON_L1" || transaction.status === "ACCEPTED_ON_L2") {
                    setResult("ACCEPTED")
                    setSuccessMessage(`Successfully mint NFT`)
                } else if (transaction.status === "REJECTED" || transaction.status === "NOT_RECEIVED") {
                    setResult("REJECTED")
                    setErrorMessage(`Failed to mint NFT`)
                } else {
                    setResult("PENDING")
                }
            }
        } else if (action === "UPLOAD") {
            setLoadingMessage("Uploading Image to IPFS...")
        }
    }, [action, city, transaction, onSetLatestTransactionHash])

    return { loadingMessage, successMessage, errorMessage, result }

}