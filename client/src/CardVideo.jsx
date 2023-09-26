// import { useState } from "react";
import UpdateRating from "./UpdateRating";
import DeleteVideo from "./DeleteVideo";

export default function CardVideo({ video, setRefreshVideos }) {
  return (
    <>
      <div key={video.id} className="video-container">
        <iframe title={video.title} src={video.url} />
        <div className="videos-functions">
          <UpdateRating video={video} />
          <DeleteVideo setRefreshVideos={setRefreshVideos} video={video} />
        </div>
      </div>
    </>
  );
}
