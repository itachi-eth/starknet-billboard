import React, { useState } from "react"
import { Popup } from "react-map-gl"
import { PostOrBidProps } from "./model"
import Details from "./Details"
import { styled } from "@mui/system"
import Form from "./Form"

const StyledPopup = styled(Popup)(({ theme }) => ({
    cursor: "default",

    ".mapboxgl-popup-close-button": {
        position: "absolute",
        top: "5px",
        right: "5px",
        background: "transparent",
        color: theme.palette.primary.main,
        fontSize: "25px"
    }
}))

const PostOrBid: React.FC<PostOrBidProps> = ({ info, setPopupInfo }) => {
    const [showForm, setShowForm] = useState(false)

    let comp = <Form info={info} setPopupInfo={setPopupInfo} setShowForm={setShowForm} />

    if (info && info.isBid) {
        if (showForm) {
            comp = <Form info={info} setPopupInfo={setPopupInfo} setShowForm={setShowForm} />
        } else {
            comp = <Details info={info} setShowForm={setShowForm} setPopupInfo={setPopupInfo} />
        }
    }

    return (
        <div>
            {
                info && <StyledPopup
                    maxWidth={"500px"}
                    anchor="top"
                    longitude={info.longitude}
                    latitude={info.latitude}
                    closeOnClick={false}
                    onClose={() => {
                        setPopupInfo(null)
                        setShowForm(false)
                    }}
                >
                    {comp}
                </StyledPopup>
            }
        </div>

    )
}

export default React.memo(PostOrBid)