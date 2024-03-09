import React, { useState } from "react";

const AddVideo = ({ onVidAdd }) => {
  const [ title, setTitle ] = useState("");
  const [ url, setUrl ] = useState("");

  const titleChange = (event) => {
    setTitle(event.target.value);
  };

  const urlChange = (event) => {
    setUrl(event.target.value);
  };

  const newVid = () => {
    if (title !== "" && url !== "") {
      let embedUrl = url.replace("https://youtu.be/", "https://www.youtube.com/embed/");
      console.log("Original URL:", url);
      console.log("Embed URL:", embedUrl);

      const newInput = {
        title: title,
        url: embedUrl,
        rating: 0,
      };

      onVidAdd(newInput);

      setTitle("");
      setUrl("");
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <form className="header__form">
      <div className="header__form--title">

        <input
          type="text"
          value={title}
          onChange={titleChange}
          className="header__form--title--input"
          id="colFormLabelSm"
          placeholder="insert title"
        />
      </div>
      <div className="header__form--url">


        <input
          type="text"
          value={url}
          onChange={urlChange}
          className="header__form--url--input"
          id="colFormLabelSm"
          placeholder="insert valid URL"
        />

      </div>
      <button onClick={newVid} type="button" className="btn btn-success">
        Add
      </button>
      <button type="button" className="btn btn-warning">
        Cancel
      </button>
    </form>
  );
};

export default AddVideo;
