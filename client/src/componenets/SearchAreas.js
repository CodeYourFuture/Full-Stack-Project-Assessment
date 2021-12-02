import React, { useState } from "react";

const SearchAreas = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  return (
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

      <button type="submit" value="submit" className="addButton">
        {" "}
        Add a video
      </button>
    </form>
  );
};
export default SearchAreas;
