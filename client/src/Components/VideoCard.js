import React, { useState } from "react";


function VideoCard(props) {

  const {video, handleDelete} = props
  const [rating, setRating] = useState(video.rating);

  function like() {
    setRating(rating + 1);
  }

  function dislike() {
    setRating(rating - 1);
  }

    return (
      <div>
        
        <div></div>
        <div key={video.id}>
          <p>{video.title}</p>
          <iframe
            width="600"
            height="400"
            src={video.url.replace("watch?v=", "embed/")}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title="Youtube Videos"
            allowFullScreen
          />
          <p>RATINGS: {rating}</p>
          <div>
            <button onClick={like} className="like">
              Like 👍🏼{" "}
            </button>
            <button onClick={dislike} className="dislike">
              Dislike 👎🏻{" "}
            </button>
            <button className="btn-del" onClick={() => handleDelete(video.id)}>
              Delete 🗑️
            </button>
          </div>
          <hr></hr>
        </div>
      </div>
    );
  }


export default VideoCard;
