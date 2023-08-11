import React, { useEffect, useState } from "react";

import { useHttpClient } from "../hooks/http-hook";

const Clip = () => {
  const [videos, setVideos] = useState([]);
  const [currentClip, setCurrentClip] = useState({ id: "", rating: "" });
  const { isLoading, sendRequest } = useHttpClient();

  const fetchVideos = async () => {
    try {
      const response = await sendRequest(`${process.env.REACT_APP_API_URL}/`);
      if (!isLoading) {
        setVideos(response);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const convertToEmbedLink = (url) => {
    const regex =
      /(?:https?:\/\/(?:www\.)?youtube\.com\/watch\?v=|https?:\/\/youtu\.be\/)([\w-]+)/;
    const match = url.match(regex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  console.log(videos);
  return (
    videos &&
    videos.map(({ id, title, url, rating }) => {
      const embedLink = convertToEmbedLink(url);
      return (
        <div className="video-player">
          <div key={id} className="video-embed">
            <p>{title}</p>
            <iframe
              width="560"
              height="315"
              src={embedLink}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className="video-info">
            <h2 className="video-title">Video Title 1</h2>
            <p className="video-category">Category 1</p>
            <div className="video-likes-dislikes">
              <span className="like-button">👍</span>
              <span className="dislike-button">👎</span>
            </div>
          </div>
        </div>
      );
    })
  );
};

export default Clip;
