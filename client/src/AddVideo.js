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
    input.id = uuidv4();
    addVideo(input);
  };

  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <h3>Add a video</h3>
        <label>Title:</label>
        <input
          id="title"
          type="text"
          name="title"
          value={input.title}
          onChange={handleChange}
          required
        />
        <label>URL:</label>
        <input
          id="url"
          type="text"
          name="url"
          value={input.url}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </div>
    </form>
  );
}
