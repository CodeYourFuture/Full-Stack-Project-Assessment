import React from "react";
import CountLike from "./CountLike";
import "./DisplayVideos.css";

function DisplayVideos({ data, setData, upVote }) {
  const deleteVideo = (e) => {
    const id = parseInt(e.target.id);
    fetch(`/videos/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
    let videos = [...data];
    const newArray = videos.filter((video) => video.id !== id);
    setData(newArray);
  };
  return (
    <div className="container">
      {data &&
        data.map((vid, key) => {
          return (
            <div key={key} id={vid.id}>
              <div>
                <h3>{vid.title}</h3>
                <iframe
                  width="500"
                  height="315"
                  src={vid.url.replace("watch?v=", "embed/")}
                  title={vid.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <p>Rating: {vid.rating}</p>
                <CountLike upVote={upVote} />
                <button id={vid.id} onClick={deleteVideo}>
                  Delete
                </button>
              </div>

              <br />
              <br />
            </div>
          );
        })}
    </div>
  );
}

export default DisplayVideos;
