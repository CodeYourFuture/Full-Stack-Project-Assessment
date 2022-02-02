import React from "react";

export default function SearchVideo(props) {
  return (
    <div>
      <input
        type="search"
        placeholder="Search a video..."
        name="search"
        onKeyUp={props.search}
      />
    </div>
  );
}
