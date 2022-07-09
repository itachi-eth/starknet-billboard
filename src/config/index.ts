import WORLDTOKEN_ABI from "../config/abis/world_token.json"
import BILLBOARD_ABI from "../config/abis/stark_worldmap_billboard.json"
import COLLECTION_ABI from "../config/abis/stark_worldmap_billboard_collection.json"

interface Config {
    mapToken: string
}

interface AbisConfig {
    [name: string]: any
}

export const config: Config = {
    mapToken: process.env.NEXT_PUBLIC_MAP_TOKEN ?? ''
}

export const BASE_SCAN_URL = "https://goerli.voyager.online"

export const abis: AbisConfig = {
    worldToken: WORLDTOKEN_ABI,
    billboard: BILLBOARD_ABI,
    collection: COLLECTION_ABI
}