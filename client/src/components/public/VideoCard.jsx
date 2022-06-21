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
            className="video"
            width="350"
            height="200"
            title={video.title}
            src={video.url}
            same-site="Secure"
          />
        </div>
        <div className="rating_score">Rating: {video.rating}</div>
        <div className="del_btn_container">
          <button
            className="delete_btn"
            type="button"
            onClick={() => deleteHandler(video.id)}
          >
            Delete
          </button>
        </div>

        <Vote vote={vote} setVote={setVote} />
      </section>
    </>
  );
};

export default VideoCard;
