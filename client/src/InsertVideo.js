import React from 'react'
import Delete from "./clickables/Delete";

export default function InsertVideo({video}) {
    const src = video.url.replace("watch?v=", "embed/")
  return (
    <div className='inserted-video'>
      <p>{video.title}</p>
      <p>Votes</p>
      <iframe src={src} title="YT video" allowFullScreen></iframe>
      <div>
        <Delete />
      </div>
    </div>
  );
}
