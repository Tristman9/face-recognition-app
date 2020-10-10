import React from "react";
import Tilt from 'react-tilt'
import "./Logo.css";
import brain from "./brain.png";

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt" options={{ max : 45 }} style={{ height: 100, width: 100 }} >
        <div className="Tilt-inner pa3 br2 shadow-2" style={{paddingTop: "17px",paddingLeft: "20px",height: "90 rem", width: "90 rem"}}><img src={brain} alt="logo"/></div>
        </Tilt>
        </div>
    )
}

export default Logo