import React, { useState, useEffect, useRef } from "react";
import { Avatar, Divider } from "@mui/material";
import { red } from "@mui/material/colors";
import Video from "./VideoCard/Video";
import LikeButton from "./VideoCard/LikeButton";
import DislikeButton from "./VideoCard/DislikeButton";
import DeleteButton from "./VideoCard/DeleteButton";

const VideoCard = ({ video, serverUrl, setMessage }) => {
  const [likes, setLikes] = useState(() => video.rating);

  const initialRender = useRef(true);

  const date = video.date.slice(0, 10);

  // Delete "/id"
  const deleteVideo = async () => {
    try {
      const res = await fetch(`${serverUrl}/videos/${video.id}`, {
        method: "DELETE",
      });
      if (res.status === 403) {
        alert("You can not delete initial videos");
        setMessage("You can not delete initial videos");
        return;
      }
      if (!res.ok) {
        return;
      }
      setMessage("Video was deleted");
    } catch (err) {
      console.error(`An error occurred: ${err}`);
    }
  };

  // PUT "/id"
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      const changeLikes = async () => {
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json; charset=UTF-8" },
          body: JSON.stringify({ rating: likes }),
        };
        try {
          const res = await fetch(
            `https://simeon-video-recommendation-server.onrender.com/videos/${video.id}`,
            requestOptions
          );
          if (!res.ok) {
            return;
          }
        } catch (err) {
          console.error(`An error occurred: ${err}`);
        }
      };
      changeLikes(video.id);
    }
  }, [likes, video.id]);

  const handleIncrementLikes = () => {
    setLikes((prevCount) => prevCount + 1);
  };
  const handleDecrementLikes = () => {
    if (likes === 0) {
      return;
    }
    setLikes((prevCount) => prevCount - 1);
  };

  return (
    <div className="video_card">
      <Video video={video} />
      <div className="date_wrapper">
        <span className="date">Added: {date}</span>
      </div>
      <div className="video_card_content">
        <h4>{video.title}</h4>
        <Avatar
          className="circle"
          sx={{ bgcolor: red[400], width: 60, height: 60 }}
          alt="Number of Likes"
        >
          {likes}
        </Avatar>
      </div>
      <Divider light />
      <div>
        <LikeButton handleBtnClick={() => handleIncrementLikes()} />
        <DislikeButton handleBtnClick={() => handleDecrementLikes()} />
        <DeleteButton handleBtnClick={() => deleteVideo()} />
      </div>
    </div>
  );
};

export default VideoCard;
