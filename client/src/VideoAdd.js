import React, { useState } from "react";

const VideoAdd = ({ setvideos, videos }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");



const handleSubmit = async (event) => {
  event.preventDefault();


  const newVideo = {
    id: [],
    title: title,
    url: url,
    rating: 0,
    added: Date.now().toString(),
  };

   if (!title) {
    console.error("Title cannot be empty");
    return;
  }

const youtubeUrlPattern = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
  if (!youtubeUrlPattern.test(url)) {
    console.error("Invalid YouTube URL");
    return;
  }
  
  try {
    const response = await fetch('http://127.0.0.1:5000/video', {
      method: 'POST',
      body: JSON.stringify(newVideo),
      headers: { 'Content-Type': 'application/json' }
    });

    
 
  
    const json = await response.json();
    if (json.success) {
      setvideos(prevVideos => [...prevVideos, newVideo])
    } else {
      console.log(json.message);
    }
  } catch (error) {
    console.log(error);
  }
};
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <br />
      <label>
        URL:
        <input
          type="text"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
      </label>
      <br />
      <button type="submit" class= "addVideobutton">Add Video</button>
    </form>

    
  );
};

export default VideoAdd;
