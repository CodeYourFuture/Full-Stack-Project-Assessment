import React from 'react'
import defaultVideoData from "./exampleresponse.json";
import InsertVideo from './InsertVideo';

export default function PopulateVideos() {
  return (
    <div className="all-videos">
      {defaultVideoData.map((video, key) => (
        <InsertVideo video={video} key={key} />
      ))}
    </div>
  );
}
