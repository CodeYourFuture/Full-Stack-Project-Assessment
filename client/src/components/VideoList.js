import React from 'react'
// import data from "./exampleresponse.json"
import Video from "./../Video"
import { useEffect, useState } from "react";


const VideoList = () => {
  let [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => {
        console.log(res)
        return res.json()})
      .then((vidData) => {
        console.log(vidData);
        setData(vidData);
      });
  }, []);
  
  return (
    <div>
      {data.map((vid) =>{
       return <Video video={vid} key={vid.id} /> 
      })}
    </div>
  );
}

export default VideoList