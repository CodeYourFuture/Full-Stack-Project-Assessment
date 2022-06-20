import React from "react";

const DeleteButton = (props) => {
    function handelClick() {
        let data = {id: props.id };
        fetch(("http://localhost:5000/videos"), {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .catch((error) => {
                console.log(error)
            });
    }

    return (
        <div>
            <button onClick={handelClick}>Delete</button>
        </div>
    );
}

export default DeleteButton;