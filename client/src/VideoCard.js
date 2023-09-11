// import { useState } from "react";
import SetRating from "./SetRating";

export default function VideoCard({ video, rating, setRating }) {
  return (
    <>
      <div key={video.id}>
        <h2>{video.title}</h2>
        <iframe title={video.title} src={video.url} width="500" height="281" />
        <SetRating rating={rating} setRating={setRating} video={video} />
        <div>
          <button>delete</button>
        </div>
      </div>
    </>
  );
}
// I want to get an id from url
