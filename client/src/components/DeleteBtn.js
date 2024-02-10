import React from "react";

const DeleteBtn = ({ setYoutube, youtube, movie }) => {
  function removeV(index) {
    alert("Do you want to delete " + movie.title);

    fetch(`/videos/${index}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));
    setYoutube(youtube.filter((video) => video.id !== index));
  }

  return (
    <button
      id="delete"
      className="jello-horizontal"
      aria-label="delete Video"
      onClick={() => removeV(movie.id)}
    >
      Delete
    </button>
  );
};

export default DeleteBtn;
