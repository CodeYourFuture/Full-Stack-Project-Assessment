import React, { useState } from "react";

export default function AddVideo({ addVideo }) {
  let [input, setInput] = useState({
    title: "",
    url: "",
    rating: 0,
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addVideo(input);
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <h2>Add a video</h2>
        <label>Title:</label>
        <input
          id="title"
          type="text"
          name="title"
          value={input.title}
          onChange={handleChange}
        />
        <label>URL:</label>
        <input
          id="url"
          type="text"
          name="url"
          value={input.url}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </div>
    </form>
  );
}
