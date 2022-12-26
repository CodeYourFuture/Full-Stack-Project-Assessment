import React from "react";

const AddButton = ({ add }) => {
    return (
        <button className="btn bg-success ml-1" onClick={add}>Add</button>
    )
}

export default AddButton;