import React from "react";

export default function AddVideo(props) {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <label for="videoTitle">Video Title: </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter Title"
          onChange={props.handleChange}
        />
        <label for="videoUrl">Video Url: </label>
        <input
          type="text"
          id="url"
          name="url"
          placeholder="Enter URL"
          onChange={props.handleChange}
        />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
}
