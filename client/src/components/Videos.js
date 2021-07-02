import React from "react";
import SingleVideo from "./SingleVideo";

export default function Videos(props) {
  return (
    <div>
      {props.searchingData.map((video, index) => (
        <SingleVideo video={video} key={index} />
      ))}
    </div>
  );
}
