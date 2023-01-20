import React from 'react'
import { useState } from 'react';
import { FaRegThumbsUp, FaThumbsDown } from "react-icons/fa";
import data from "../exampleresponse.json";


function Video() {

    const [copyData, setCopyData] = useState(data)

    function handleDelete(e){
       let result = copyData.filter((el, index) => {
        return index !== +e.target.id
       } )
       setCopyData(result)
    }
   
  return (
    <div>
      {copyData.map((el,key) => {
        let index = el.url.indexOf("=");
        let id = el.url.slice(index + 1);
        return (
          <div>
            <p>{el.title}</p>
            <div>
              <FaRegThumbsUp></FaRegThumbsUp>
              <p>0 votes</p>
              <FaThumbsDown></FaThumbsDown>
            </div>

            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${id}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button id = {key} onClick = {handleDelete}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default Video
