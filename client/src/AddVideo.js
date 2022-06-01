import React, { useState } from "react";

const AddVideo = ({ setShowAddVideo, setVideos, videos }) => {
  const [addTitle, setAddTitle] = useState("");
  const [addUrl, setAddUrl] = useState("");
  const addVideoToVideos = (e) => {
    e.preventDefault();
    setVideos(videos.concat({ id: generateRandomId(videos), title: addTitle, url: addUrl, rating: 0 }));
    console.log(videos);
    setAddTitle("");
    setAddUrl("")
  };
  const generateRandomId = (arr) => {
    const randomId = Math.floor(100000 + Math.random() * 900000);
    const alreadyHasId = arr.some((video) => video.id === randomId);
    if (alreadyHasId) {
      generateRandomId(arr);
    } else {
      return randomId;
    }
  };
  return (
    <>
      <form onSubmit={addVideoToVideos}>
        <label>
          Title
          <input type="text" id="title" name="title" value={addTitle} onChange={(e) => setAddTitle(e.target.value)} />
        </label>
        <label>
          Url
          <input type="url" id="url" name="url" value={addUrl} onChange={(e) => setAddUrl(e.target.value)} />
        </label>
        <button>Add</button>
      </form>
      <button onClick={() => setShowAddVideo(false)}>Cancel</button>
    </>
  );
};

export default AddVideo;
