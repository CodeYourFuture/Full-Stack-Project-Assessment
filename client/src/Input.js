import React from "react";

export default function Input({ getVideoById, search, setSearch }) {
  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="search for a video"
      ></input>
      <button
        type="button"
        onClick={() => {
          getVideoById(search);
        }}
      >
        search
      </button>
    </div>
  );
}
