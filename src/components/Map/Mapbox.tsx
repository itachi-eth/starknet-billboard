import React, { useState } from "react";
import Map, {
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl
} from 'react-map-gl';
import { Box } from '@mui/system';
import { styled } from '@mui/system'
import { config } from '../../config';
import CircularProgress from '@mui/material/CircularProgress';
import Pins from "./Pins";
import PostOrBid from "./PostOrBid";
import { useCityInfo } from "../../hooks/useInfo";
import { useBaseInfo } from "../../contexts/Info/hooks";

const TOKEN = config.mapToken

const geolocateStyle = {
    top: 0,
    left: 0,
    padding: '10px',
};

const fullscreenControlStyle = {
    top: 36,
    left: 0,
    padding: '10px',
};

const navStyle = {
    top: 72,
    left: 0,
    padding: '10px'
};

const scaleControlStyle = {
    bottom: 36,
    left: 0,
    padding: '10px'
};

const MapLoadingLayout = styled('div')({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(250, 250, 250, 0.5)",
    zIndex: 2,
})

const Mapbox: React.FC = () => {
    const [viewport, setViewport] = useState({
        latitude: 30.7946,
        longitude: 106.5348,
        zoom: 3,
        bearing: 0,
        pitch: 0
    });
    const [popupInfo, setPopupInfo] = useState<any>(null);
    const cities = useCityInfo()
    const isMounted = cities && cities.length > 0
    const baseInfo = useBaseInfo()

    return (
        <Box>
            <Map
                {...viewport}
                style={{
                    width: "100%",
                    height: '100vh'
                }}
                mapStyle={"mapbox://styles/mapbox/streets-v10"}
                onMove={(evt) => setViewport(evt.viewState)}
                mapboxAccessToken={TOKEN}
            >
                {
                    isMounted
                        ? <Pins cities={cities} onClick={setPopupInfo} zoom={viewport.zoom} /> : <MapLoadingLayout>
                            <CircularProgress size="45px" />
                        </MapLoadingLayout>
                }

                <PostOrBid info={popupInfo} setPopupInfo={setPopupInfo} />

                <GeolocateControl style={geolocateStyle} />
                <FullscreenControl style={fullscreenControlStyle} />
                <NavigationControl style={navStyle} />
                <ScaleControl style={scaleControlStyle} />
            </Map>
        </Box>
    )

}

export default Mapbox