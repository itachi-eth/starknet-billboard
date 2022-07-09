import { Box } from "@mui/material"
import React from "react"
import { StyledInput } from "./elements"
import { InputProps } from "./types"

const CustomInput: React.FC<InputProps> = ({ value, onChange, startAdornment, placeholder, textcolor, bgcolor, margin }) => {
    return (
        <Box sx={{ width: "100%", margin: `${margin ? margin : "10px"}` }}>
            <StyledInput
                startAdornment={startAdornment}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                bgcolor={bgcolor}
                textcolor={textcolor}
            />
        </Box>

    )
}

export default CustomInput