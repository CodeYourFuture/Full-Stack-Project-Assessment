import React from "react";

const DeleteBtn = ({dataEmb}) => {
    const handleDelete = (id) => {
    if (!id) {
      console.error("ID is undefined");
      return;
    }
    fetch(`/videos/remove/${id}`,{
      method: "DELETE"
    })
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  };

    return (
        <div>
            <button onClick={() => handleDelete(dataEmb.id)}>Delete</button>
        </div>
    );  
};

export default DeleteBtn