import React, { useState } from "react";
const AddVideo = ({ handleChange, setTitle, setUrl, handleSubmit }) => {
  const [click, setClick] = useState(false);

  return (
    <div className="add-video-container">
      <p
        className="add-video-text"
        onClick={() => {
          setClick(true);
        }}
      >
        Add Video
      </p>
      {click && (
        <form action="/" method="post" className="add-video">
          {" "}
          <label for="fname">Title: </label>
          <input
            type="text"
            name="title"
            placeholder="type video title"
            onChange={handleChange}
            value={setTitle}
          />
          <br></br>
          <label for="lname">Url: </label>
          <input
            type="text"
            name="url"
            placeholder="type url"
            onChange={handleChange}
            value={setUrl}
          />
          <br></br>
          <input
            type="button"
            value="cancel"
            className="btn btn-warning"
            onClick={() => setClick(false)}
          />
          <input
            type="submit"
            value="Submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          />
        </form>
      )}
      {/* {click && (
        <div className="add-video">
          <p>Title</p>
          <input
            placeholder="type video title"
            value={setTitle}
            name="title"
            onChange={handleChange}
          ></input>
          <p>URL</p>
          <input
            placeholder="type url"
            onChange={handleChange}
            value={setUrl}
            name="url"
          ></input>
          <div className="add-video-buttons">
            <button className="btn btn-warning" onClick={() => setClick(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Add{" "}
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};
export default AddVideo;
