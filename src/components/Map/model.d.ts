import { City } from "../../config/model";

export interface CityInfo extends City {
    isBid?: boolean,
    owner?: string,
    ipfsHash?: string,
    bidLevel?: number
    twitter?: string
    bidPrice?: number
}

export interface PostOrBidProps {
    info: CityInfo
    setPopupInfo: (params: any) => void
    tokenBalance?: number
    allowance?: number
}

export interface FormProps extends PostOrBidProps {
    setShowForm: (params: boolean) => void
}

export interface PinsProps {
    cities: CityInfo[],
    onClick: React.Dispatch<React.SetStateAction<any>>,
    zoom: number
}