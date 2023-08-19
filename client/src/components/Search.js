import React from "react";

export default function Search(props) {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <label for="videoTitle">Video Title: </label>
        <input
          type="text"
          id="videoTitle"
          name="videoTitle"
          placeholder="Enter Title"
        />
        <label for="videoUrl">Video Url: </label>
        <input
          type="text"
          id="videoUrl"
          name="videoUrl"
          placeholder="Enter URL"
        />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
}
