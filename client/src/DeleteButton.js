import React from "react";

const DeleteButton = ({ item, videoData, setVideoData }) => {
  const deleteFunction = (e) => {
    e.preventDefault();
    const id = parseInt(item.id);

    fetch(`/videos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    const updateVideos = videoData.filter((video) => video.id !== id);

    setVideoData(updateVideos);
  };

  return (
    <div>
      <button onClick={deleteFunction}>Delete</button>
    </div>
  );
};

export default DeleteButton;
