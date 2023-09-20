// import { useState } from "react";
import UpdateRating from "./UpdateRating";
import DeleteVideo from "./DeleteVideo";

export default function CardVideo({ video, setRefreshVideos }) {
  return (
    <>
      <div key={video.id}>
        <h2>{video.title}</h2>
        <iframe title={video.title} src={video.url} width="500" height="281" />
        <UpdateRating video={video} />
        <DeleteVideo setRefreshVideos={setRefreshVideos} video={video} />
      </div>
    </>
  );
}
