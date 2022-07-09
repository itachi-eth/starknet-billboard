import { styled } from "@mui/system"

export const PopupLayout = styled('div')(({ theme }) => ({
    padding: "20px",
    minWidth: "30px",
    maxWidth: "500px",

    [theme.breakpoints.down('sm')]: {
        padding: "10px",
    }
}))

export const StyledTextArea = styled('textarea')(({ theme }) => ({
    fontSize: "14px",
    padding: "10px",
    borderRadius: "4px",

    ":focus": {
        outline: "none !important",
    }
}))

export const StyledImageUploader = styled('input')(({ theme }) => ({
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #d3d3d3",
    width: "98%",
    padding: "5px 2px",

    ":focus": {
        outline: "none !important",
        border: `2px solid ${theme.palette.primary.main}`
    }
}))

export const TwitterLink = styled("a")(({
    textDecoration: "none"
}))