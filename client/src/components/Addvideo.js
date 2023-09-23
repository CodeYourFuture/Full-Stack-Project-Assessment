import React, { useState } from "react";

function Addvideo(props) {
  const [enterTitle, setEnterTitle] = useState("");
  const [videoLink, setVideoLink] = useState("");

  function getTitle(event) {
    setEnterTitle(event.target.value);
  }

  function getUrl(event) {
    setVideoLink(event.target.value);
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
        console.log("insert succesfull");
      });
    
    setEnterTitle("");
    setVideoLink("");
  }

  return (
    <div>
      <form>
        <label htmlFor="VideoTitle">Video Title</label>
        <input
          id="VideoTitle"
          type="text"
          value={enterTitle}
          onChange={getTitle}
        />

        <label htmlFor="VideoLink">Video Link</label>
        <input
          id="VideoLink"
          type="text"
          value={videoLink}
          onChange={getUrl}
        />

        <input id="Submit" type="submit" onClick={submitInfo} />
      </form>
    </div>
  );
}

export default Addvideo;
