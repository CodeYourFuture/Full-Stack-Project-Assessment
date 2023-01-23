import React, { useState } from "react";
const AddAVideo = ({ newVideo }) => {
  const [title, Title] = useState("");
  const [url, Url] = useState("");

  const Vid = () => {
    newVideo({ title, url });
  };
  return (
    <div>
      <div className="title">
        <label for="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => Title(e.target.value)}
        ></input>
      </div>

      <div>
        <label for="url">Url:</label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => Url(e.target.value)}
        ></input>

        <input type="button" value="Add" onClick={Vid}></input>
      </div>
    </div>
  );
};

export default AddAVideo;
