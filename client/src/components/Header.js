import React from "react";
import AddVideoButton from "./buttons/AddVideoButton";

const Header = ({ getModal }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light container d-flex justify-content-between">
            <h3 className="navbar-brand" href="#">Recommended Videos</h3>
            <AddVideoButton addVideo={getModal} />
        </nav>
    )
}

export default Header;