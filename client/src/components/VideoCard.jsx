import React, { useState } from "react";
import { Avatar, Divider } from "@mui/material";
import { red } from "@mui/material/colors";
import Video from "./VideoCard/Video";
import LikeButton from "./VideoCard/LikeButton";
import DislikeButton from "./VideoCard/DislikeButton";
import DeleteButton from "./VideoCard/DeleteButton";

const VideoCard = ({ video, delVid }) => {
  const [likes, setLikes] = useState(() => video.rating);

  function incrementLikes() {
    setLikes((prevCount) => prevCount + 1);
  }
  function decrementLikes() {
    setLikes((prevCount) => (prevCount === 0 ? prevCount : prevCount - 1));
  }

  return (
    <div className="video_card">
      <Video video={video} />
      <div className="video_card_content">
        <h4>{video.title}</h4>
        <Avatar
          className="circle"
          sx={{ bgcolor: red[400], width: 60, height: 60 }}
          alt="Likes"
        >
          {likes}
        </Avatar>
      </div>
      <Divider light />
      <div>
        <LikeButton handleBtnClick={incrementLikes} />
        <DislikeButton handleBtnClick={decrementLikes} />
        <DeleteButton handleBtnClick={delVid} />
      </div>
    </div>
  );
};

export default VideoCard;
