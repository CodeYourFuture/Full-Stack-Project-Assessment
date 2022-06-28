import React, { useState } from "react";

const AddNewVideo = ({setAllVideos, setAddVideo, urlToFetch, generateVideo}) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");


  /* 
  const generateRandomId = (arr) => {
  const randomId = Math.floor(100000 + Math.random() * 900000);
  const alreadyHasId = arr.some((video) => video.id === randomId);
  if (alreadyHasId) {
    generateRandomId(arr);
  } else {
    return randomId;
  }
}; */
  
   const handleSubmit = async event => {
     event.preventDefault();
     const res = await fetch(`${urlToFetch}`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({title, url})
    });
    const data = await res.text();
    console.log(data)
     setTitle("");
     setUrl("");
    generateVideo();
     //This functions increments each video id 
  //   const getId = (id) => {
  //   return id++
  // }
  //     const addVideo = {
  //       title,
  //       url,
  //       id: {getId},
  //       rating: 5,
  //     };

  //     setAllVideos((allVideos) => {
  //       return allVideos.concat(addVideo);
  //     });
  //    setTitle("");
  //    setUrl("");
   };
  
  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          URL
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <div className="">
          <div className = "">
        <button
          onClick={() => setAddVideo(false)}
          type="cancel"
          className=""
        >
          Cancel
        </button>
        <button type="add" className="">
          ADD
        </button>
        </div>
        </div>
      </form>
    </div>
  );
}

export default AddNewVideo;