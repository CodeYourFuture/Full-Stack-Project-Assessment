import React, { useState } from "react";

function AddVideoForm({AddVideo}) {
//   const [showValid, Setvalid] = useState(true);
    const [newVideo, setNewVideo] = useState({});
   const [videoTitle, setTitle] = useState("");
  const [videoUrl, setUrl] = useState("");
  const [videoData, setVideoData] = useState({
    title: "",
    url: "",
  });
  ;

//   const handleShowValid = () => {
//     Setvalid(!showValid);}
  
   function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }
  const handleAddVideo = (event) => {
    event.preventDefault();
    videoTitle !== ""
      ? (newVideo.title = videoTitle)
      : alert("Please add a title for your video.");

    isValidUrl(videoUrl)
      ? (newVideo.url = videoUrl)
      : alert("Please add a valid url.");
    newVideo.rating = Math.floor(Math.random() * 5000) + 1;

    

    AddVideo(newVideo);
    setVideoData({
      title: "",
      url: "",
    });

    // const newVideoData = {
    //   id: Math.floor(Math.random() * 1000),
    //   title,
    //   url,
    // };
    
 newVideo.id = Math.floor(Math.random() * 1000);
    // setVideos([newVideo, ...videos]);
     setNewVideo({});
    setTitle("");
    setUrl("");
  };

  return (
    <div>
      
        <form onSubmit={handleAddVideo}>
          <div>
            <label htmlFor="title">Tile:</label>
            <input
              type="text"
              id="title"
              value={videoData.title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <label htmlFor="url">Url:</label>
            <input
              type="text"
              id="url"
              value={videoData.url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
              required
            ></input>
          </div>
          <div>
            
            <button type="submit">Add</button>
          </div>
        </form>
      
    </div>
  );
}

export default AddVideoForm;