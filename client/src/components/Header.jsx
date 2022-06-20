import React from "react";
import { faVideo, faVideoCamera, faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Header(){
    return(
        <header className="App-header">
            
            <div>
                <FontAwesomeIcon
                className="fontawe "
                icon={faVideoCamera}
                />
                <FontAwesomeIcon
                className="fontawe "
                icon={faVideoCamera}
                />
                <FontAwesomeIcon
                className="fontawe "
                icon={faVideoCamera}
                />
                <FontAwesomeIcon
                className="fontawe "
                icon={faVideoCamera}
                />
                <FontAwesomeIcon
                className="fontawe "
                icon={faVideoCamera}
                />
            </div>
            <h1 className="text-white">Video Recommendation</h1>
        </header>
    )
}
export default Header;