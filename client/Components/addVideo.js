import React, { useState } from "react";
import "./Main.css";

function Main({ addVideos }) {
  const [input, setinput] = useState({
    title: "",
    url: "",
    rating: 0,
  });
  const handleChange = (event) => {
    setinput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };
  function handleSubmit(e) {
    e.preventDefault();
    addVideos(input);
  }
  return (
    <div className="left">
      <div>
        <h1>Add video</h1>
        <div className="contenar">
          <form onSubmit={handleSubmit}>
            <label>Title </label>
            <input
              type="text"
              name="title"
              value={input.title}
              onChange={handleChange}
            />
            <label>URL </label>
            <input
              type="text"
              name="url"
              value={input.url}
              onChange={handleChange}
            />
            <div className="left">
              <button type="Submit">Add</button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <label className="search">Search </label>
        <input type={"text"} />
      </div>
    </div>
  );
}

export default Main;
