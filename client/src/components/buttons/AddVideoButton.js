import React from "react";

const AddVideoButton = ({ addVideo }) => {
    return (
        <button className="btn bg-dark text-white" onClick={addVideo}>Add Video</button>
    )
}

export default AddVideoButton;