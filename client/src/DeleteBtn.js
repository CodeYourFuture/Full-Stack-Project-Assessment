import React, {useState} from "react";

const DeleteBtn = ({embUrls}) => {
    const [Delete , setDelete]  = useState([embUrls]);
    const handleDelete = (index) => {
        const newItems = [...Delete];
        newItems.splice(index, 1);
        setDelete(newItems);
    }; 

    return (
        <div>
            <button onClick={(obj) => handleDelete(obj)}>Delete</button>
        </div>
    );  
};

export default DeleteBtn