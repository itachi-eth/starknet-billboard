import { styled } from "@mui/system";
import { LinkProps } from "./types";
import { FiExternalLink } from "react-icons/fi"
import Link from "next/link";

const LinkItems = styled('a')<{ margin?: string }>(({ theme, margin }) => ({
    color: "#FA02DC",
    margin: `${margin ? margin : "10px 0"}`,
    width: "100%",
    fontSize: "14px",
    textDecoration: "none",
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",

    "svg": {
        color: "#FA02DC",
        width: "16px",
        height: "16px",
        margin: "5px",
    }
}))

export const LinkEnternal: React.FC<LinkProps> = ({ href, text, margin }) => {
    return (
        <Link href={href} >
            <LinkItems margin={margin} href={href} target="_blank">
                <span>{text}</span>
                <FiExternalLink />
            </LinkItems>
        </Link>
    )
}