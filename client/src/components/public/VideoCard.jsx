import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import Vote from "./Vote";
import "../../styles/videocard.css";

const VideoCard = ({ video }) => {
  const [vote, setVote] = useState(0);
  const { deleteHandler } = useContext(UserContext);
  return (
    <>
      <section className="video_card">
        <div className="video_title" key={video.id}>
          {video.title}
        </div>
        <div>
          <iframe
            width="350"
            height="200"
            title={video.title}
            src={video.url}
            same-site="Secure"
          />
        </div>
        <div className="video_votes">{video.rating}</div>
        <button
          className="delete_btn"
          type="button"
          onClick={() => deleteHandler(video.id)}
        >
          Delete
        </button>
        <Vote vote={vote} setVote={setVote} />
      </section>
    </>
  );
};

export default VideoCard;
