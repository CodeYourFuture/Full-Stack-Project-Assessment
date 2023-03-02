import React from "react";

const DeleteBtn = ({handleDelete}) => {
    return (
        <div>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default DeleteBtn