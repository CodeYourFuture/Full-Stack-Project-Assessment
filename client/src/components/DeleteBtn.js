import React from "react";

const DeleteBtn = ({ setYoutube, youtube, movie }) => {
  function removeV(index) {
    alert("Do you want to delete " + movie.title);

    fetch(`http://localhost:5000/videos/${index}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log();
        setYoutube(youtube.filter((video) => video.id !== index));
      })
      .catch((error) => console.error(error));
  }

  return (
    <button aria-label="delete Video" onClick={() => removeV(movie.id)}>
      Delete
    </button>
  );
};

export default DeleteBtn;
