import { styled } from "@mui/system";
import { OutlinedInput } from '@mui/material';

export const StyledInput = styled(OutlinedInput)<{ bgcolor?: string, textcolor?: string }>(({ theme, bgcolor, textcolor }) => ({
    height: "48px",
    fontSize: "14px",
    width: "100%",
    backgroundColor: `${bgcolor ? bgcolor : "#c241b4"}`,
    color: `${textcolor ? textcolor : "#ffffff"}`,
}))
