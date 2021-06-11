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
    </div>
  );
};
export default AddVideo;
