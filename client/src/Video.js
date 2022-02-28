import React from "react";
import VideoVotes from "./VideoVotes";
import DeleteButton from "./DeleteButton";

export default function Video({ videos, updatedList }) {
  // Handles deletes for database
  const deleteHandler = (id) => {
    fetch(`/api/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.status === 200) {
          updatedList(
            videos.filter((video) => {
              console.log("Deleted video:", id);
              return video.id !== id;
            })
          );
        } else console.log(res);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  // Returning Video cards
  return videos.map((video) => {
    const url = video.url.replace("watch?v=", "embed/");
    const videoTitle = video.title;
    const videoRating = video.rating;
    const videoId = video.id;
    // const dateAdded = video.date ? video.date : "unKnown date";

    return (
      <li className="videoCard" key={videoId}>
        <h3 className="videoTitle">{videoTitle}</h3>
        <div className="videoVotes">
          <VideoVotes />
        </div>

        <div>
          <iframe
            width="450"
            height="315"
            src={url}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <h6 className="videoRating">Rating: {videoRating}</h6>
        </div>
        <div className="videoDeleteBtn">
          <DeleteButton deleteVideo={deleteHandler} videoId={videoId} />
        </div>
      </li>
    );
  });
}
