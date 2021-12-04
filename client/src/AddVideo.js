import React, { useState } from "react";

function AddVideo() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  return (
    <div>
      <form className="VideoAdd">
        <input
          type="text"
          id="titleArea"
          name="titleArea"
          placeholder="Video Title:"
        />

        <input
          style={{ marginLeft: "20px" }}
          type="text"
          id="urlArea"
          name="urlArea"
          placeholder="Video Url:"
        />
        <button type="submit" value="submit">
          {" "}
          Add Video
        </button>
      </form>
    </div>
  );
}

export default AddVideo;
