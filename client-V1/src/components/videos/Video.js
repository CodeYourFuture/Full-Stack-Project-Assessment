import React from "react";
import {
  LikeOutlined,
  DislikeOutlined,
  DeleteOutlined,
  // StarOutlined,
} from "@ant-design/icons";
import { Rate, Divider } from "antd";
import "../../assets/css/general.css";

export default function Video({ video, deleteVideo, incRating, decRating }) {
  return (
    <div>
      <h4 className="video-title">{video.title}</h4>
      <iframe
        src={`https://www.youtube.com/embed/${video.url.split("watch?v=")[1]}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div>
        {/* <StarOutlined /> */}
        <Rate />
        <span>{video.rating}</span>
      </div>
      <Divider orientation="left"></Divider>
      <div className="container-icon">
        <span>
          <DeleteOutlined onClick={() => deleteVideo(video.id, video.rating)} />
        </span>
        <span className="like">
          <LikeOutlined onClick={() => incRating(video.id)} />
        </span>
        <span className="dislike">
          <DislikeOutlined onClick={() => decRating(video.id, video.rating)} />
        </span>
        {/* <LikeOutlined onClick={() => incRating(video.id)} />
        <DislikeOutlined onClick={() => decRating(video.id, video.rating)} /> */}
        {/* <DeleteOutlined onClick={() => deleteVideo(video.id, video.rating)} /> */}
      </div>
    </div>
  );
}
