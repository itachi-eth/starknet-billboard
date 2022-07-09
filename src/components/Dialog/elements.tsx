import { styled } from "@mui/system";
import { IconButton } from "@mui/material"

export const IconContainer = styled("div")<{ color: string }>(({ color }) => ({
    width: "50px",
    height: "50px",

    "svg": {
        width: "50px",
        height: "50px",
        color: color,
    }
}))

export const CloseButton = styled(IconButton)(({ theme }) => ({
    position: "absolute",
    top: "1.2rem",
    right: "1.5rem",
    background: "transparent",
    color: "#FA02DC",
}))