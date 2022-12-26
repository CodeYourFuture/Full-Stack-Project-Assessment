import React from "react";

const CancelButton = ({ cancelModal }) => {
    return (
        <button className="btn btn-warning mr-1" onClick={cancelModal}>Cancel</button>
    )
}

export default CancelButton;