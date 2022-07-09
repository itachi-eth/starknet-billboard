import { BASE_SCAN_URL } from "../config";

export const getTranscationHash = (hash: string) => {
    return `${BASE_SCAN_URL}/tx/${hash}`
}