import React from "react";

export default function VideoSearch(props) {
  return (
    <div className="search-bar">
      <input
        type="search"
        placeholder="Search..."
        name="search"
        // value={searchValue}
        onKeyUp={props.search}
      />
    </div>
  );
}
