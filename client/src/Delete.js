import React from "react";


const DeleteButton = (props) => {
    const herokuDB = "https://full-stack-project-assessment.herokuapp.com/videos";

    function upateDateDelete(updateData) {
        props.setFilterVideo(updateData)
    }
    function handelClick() {
        let data = { id: props.id };
        fetch((herokuDB), {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then(data => upateDateDelete(data))
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