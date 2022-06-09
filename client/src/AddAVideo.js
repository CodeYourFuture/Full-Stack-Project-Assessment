import React, { useState } from "react";

const AddAVideo = () => {
  
  const [title, setTitle] = useState(" ");
  const [url, setUrl] = useState(" ");

  //use call back function on the onchange, it's less code
  // function addNewVideo (e) {
  //   setTitle(e.target.value).pop()
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    const video = { title, url };
    console.log(video)
  };

  const handleDelete = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="add-a-video">
        <form onSubmit={handleSubmit}>
          <label for="title">
            Title:
            <input
              className="input is-primary"
              placeholder="enter title"
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              required
              value={title}
            />
          </label>

          <label for="title">
            Url:
            <input
              className="input is-info"
              placeholder="enter url"
              onChange={(e) => setUrl(e.target.value)}
              type="text"
              required
              value={url}
            />
          </label>

          <div className="add-video-button">
            <button
              className="button is-rounded is-danger"
              onClick={handleDelete}
            >
              cancel
            </button>
            <button
              className="button is-rounded is-success"
              onClick={handleSubmit}
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default AddAVideo;
