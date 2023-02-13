import React from "react";
import VideoCard from "./VideoCard";


export default function Videos({data, setData}) {
  
  return (
    <div>
      <VideoCard data={data} setData={setData} />
    </div>
  );
}
