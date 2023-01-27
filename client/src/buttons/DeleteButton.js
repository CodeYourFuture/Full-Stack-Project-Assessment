import React from "react";

function DeleteButton({ videoData, setVideoData, id }) {
  const handleOnClick = (id) => {
    fetch(
      `https://full-stack-project-assessment-server.onrender.com/${id}`,
      { method: "DELETE" }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        // return response.json();
      })
      .then((data) => {
        console.log(data);
        fetch(
          "https://full-stack-project-assessment-server.onrender.com/"
        )
          .then((res) => res.json())
          .then((result) => setVideoData(result));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <button
      className="p-2 mb-1 bg-danger text-white delete-button"
      onClick={() => handleOnClick(id)}
    >
      Delete
    </button>
  );
}

export default DeleteButton;
