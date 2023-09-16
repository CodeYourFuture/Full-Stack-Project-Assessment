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
