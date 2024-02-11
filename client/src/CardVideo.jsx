// import { useState } from "react";
import UpdateRating from "./UpdateRating";

export default function CardVideo({ video, setRefreshVideos }) {
  return (
    <div key={video.id} className="video-container">
      <iframe
        title={video.title}
        src={video.url}
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
      <div className="videos-functions">
        <UpdateRating video={video} setRefreshVideos={setRefreshVideos} />
      </div>
    </div>
  );
}
