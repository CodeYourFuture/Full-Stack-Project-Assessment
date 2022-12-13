import React, { useState, useEffect, useRef } from "react";
import AddButton from "./AddButton";

const AddVideo = ({ addVideo }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const ref = useRef(null);
  // const refURL = useRef(null);
  const [myFocus, setMyFocus] = useState(false);

  useEffect(() => {
    if (document.hasFocus() && ref.current.contains(document.activeElement)) {
      setMyFocus(true);
    }
  }, []);

  const handleAdd = (event) => {
    event.preventDefault();
    ref.current.focus();
    let vidObj = {
      id: `${url.slice(url.indexOf("=") + 1)}`,
      title: title,
      url: url,
      rating: 0,
    };
    addVideo(vidObj);
  };

  return (
    <form className="form-group search-box" onSubmit={handleAdd}>
      <div className="search-row">
        <label htmlFor="vidTitle">Video Title</label>
        <input
          type="text"
          id="vidTitle"
          className="form-control"
          placeholder="Enter Video Title"
          value={title}
          ref={ref}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setMyFocus(true)}
          onBlur={() => setMyFocus(false)}
        />
      </div>
      <div className="search-row">
        <label htmlFor="vidUrl">Video URL</label>
        <input
          type="text"
          id="vidUrl"
          className="form-control"
          placeholder="Enter Video URL"
          value={url}
          ref={ref}
          onChange={(e) => setUrl(e.target.value)}
          onFocus={() => setMyFocus(true)}
          onBlur={() => setMyFocus(false)}
        />
      </div>
      <AddButton />
    </form>
  );
};

export default AddVideo;
