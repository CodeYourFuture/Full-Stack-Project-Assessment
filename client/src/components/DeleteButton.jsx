import React from "react";

const DeleteButton = ({videoId, onDelete}) => {
const handleDelete=() => {
    onDelete(videoId)
};
return <button onClick={handleDelete} >Delete</button>
};
export default DeleteButton;