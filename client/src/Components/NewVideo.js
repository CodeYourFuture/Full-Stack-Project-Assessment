import React, { useState } from "react";



function NewVideo() {
  
  const [newVideos, SetNewVideos] = useState("");
  const[title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleNewVideo = (newVideos) => {
   SetNewVideos((prevVideosData) => [
     ...prevVideosData,
     { ...newVideos, id: Date.now(), rating: 0 },
   ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && url) {
      SetNewVideos({ title, url });
      setTitle("");
      setUrl("");
    }
  };




  return (
    <div className="new-video">
      <p>Add new video to your list</p>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Title: <input type="text" 
          placeholder="enter title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          
          required/>
        </label> <br></br>
        <label>
          URL: <input type="url" 
          placeholder="enter url address" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required/>
        </label><br></br>
        <button type="submit">Submit Video</button>
      </form>
    </div>
  );
}
export default NewVideo;
