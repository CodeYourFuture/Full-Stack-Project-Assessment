import React from "react";
import {  faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header(){
    return(
        <header className="App-header">        
            <div>
                <FontAwesomeIcon
                className="fontaweH1 "
                icon={faVideoCamera}
                />
            </div>
            <h1 className="text-white">Video Recommendation</h1>
        </header>
    )
}
export default Header;