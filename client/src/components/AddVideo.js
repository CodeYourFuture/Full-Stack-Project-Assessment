import React, { useState } from 'react';

function AddVideo (props) {

  const [enterTitle, setEnterTitle] = useState("");
  const [videoLink, setVideoLink] = useState("");

  function getTitle (e) {
    setEnterTitle(e.target.value)
  }

  function getUrl(e) {
    setVideoLink(e.target.value);
  }

  function submitInfo(event) {
    event.preventDefault();

    const newVideo = {
      title: enterTitle,
      url: videoLink,
    };

    fetch("http://127.0.0.1:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVideo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("success");
        // Update the video list in the parent component
        props.addVideo(newVideo);
      })
      .catch((error) => {
        console.error("failed:", error);
      });
    setEnterTitle("");
    setVideoLink("");
  } 
  return(
    <div>
      <form>
      <label htmlFor="Video title">Video Title</label>
            <input id="VideoTitle" type="text" value={enterTitle} onChange={getTitle}/>
            <label htmlFor="Videolink">Video link</label>
            <input id="VideoLink" type="text" value={videoLink} onChange={getUrl}/>
            <input id="Submit" type="submit" onClick={submitInfo}/>
      </form>
    </div>
  );
}

export default AddVideo;
