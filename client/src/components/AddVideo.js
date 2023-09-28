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
    console.log("My List", enterTitle, videoLink);

    fetch("http://127.0.0.1:5000/", {

    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: enterTitle,
      url: videoLink,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("Succes");
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
