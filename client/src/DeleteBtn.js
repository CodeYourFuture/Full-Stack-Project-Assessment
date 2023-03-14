import React, {useState} from "react";

const DeleteBtn = ({data}) => {
    const [Delete , setDelete]  = useState([data]);
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