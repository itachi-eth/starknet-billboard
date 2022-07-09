import { useState, useEffect } from "react";
import { Action, Result } from "../components/Dialog";
import { useStarknetTransactionManager } from "@starknet-react/core";

export const useTransaction = () => {
    const { transactions } = useStarknetTransactionManager();
    if (transactions === undefined || transactions.length === 0) return null
    return transactions
}

export const useTransactionManager = (action: Action, city: string) => {
    const [loadingMessage, setLoadingMessage] = useState<string>("")
    const [successMessage, setSuccessMessage] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [transactionHash, setTransactionHash] = useState<string>("")
    const [result, setResult] = useState<Result>("PENDING")
    const transactions = useTransaction()

    console.log(">>>>>>>transactions", transactions)

    useEffect(() => {
        if (action === "APPROVE") {
            setResult("PENDING")
            setTransactionHash("")
            setLoadingMessage("Approving WORLD Token...")
            if (transactions) {
                if (transactions[0].status === "ACCEPTED_ON_L1" || transactions[0].status === "ACCEPTED_ON_L2") {
                    setResult("ACCEPTED")
                    setSuccessMessage('Successfully approve WORLD Token')
                    setTransactionHash(transactions[0].transactionHash)
                } else if (transactions[0].status === "REJECTED" || transactions[0].status === "NOT_RECEIVED") {
                    setResult("REJECTED")
                    setErrorMessage("Failed to approve WORLD Toke")
                } else {
                    setResult("PENDING")
                }
            }
        } else if (action === "BID") {
            setResult("PENDING")
            setLoadingMessage("Billboard Form Submitting...")
            if (transactions) {
                if (transactions[0].status === "ACCEPTED_ON_L1" || transactions[0].status === "ACCEPTED_ON_L2") {
                    setResult("ACCEPTED")
                    setSuccessMessage(`Successfully bid ${city}`)
                    setTransactionHash(transactions[0].transactionHash)
                } else if (transactions[0].status === "REJECTED" || transactions[0].status === "NOT_RECEIVED") {
                    setResult("REJECTED")
                    setErrorMessage(`Failed to bid ${city}`)
                } else {
                    setResult("PENDING")
                }
            }
        } else if (action === "MINT") {
            setResult("PENDING")
            setLoadingMessage("Minting NFT...")
            if (transactions) {
                if (transactions[0].status === "ACCEPTED_ON_L1" || transactions[0].status === "ACCEPTED_ON_L2") {
                    setResult("ACCEPTED")
                    setSuccessMessage(`Successfully mint NFT`)
                    setTransactionHash(transactions[0].transactionHash)
                } else if (transactions[0].status === "REJECTED" || transactions[0].status === "NOT_RECEIVED") {
                    setResult("REJECTED")
                    setErrorMessage(`Failed to mint NFT`)
                } else {
                    setResult("PENDING")
                }
            }
        } else if (action === "UPLOAD") {
            setResult("PENDING")
            setLoadingMessage("Uploading Image to IPFS...")
            setSuccessMessage("")
            setErrorMessage("")
        }
    }, [action, city, transactions])

    return { loadingMessage, successMessage, errorMessage, result, transactionHash }

}