import React from "react";
import { useState } from "react";

const Form = ({ callNewVideo }) => {
  const [showForm, setShowForm] = useState(true);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const hideForm = (e) => {
    e.preventDefault();
    setShowForm(false);
  };
  const displayForm = (e) => {
    e.preventDefault();
    setShowForm(true);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };
  const addVideo = () => {
    let newUrl = url;
    let newTitle = title;
    let addNewVideo = {
      url: newUrl,
      title: newTitle,
      id: Math.random() * 10000,
    };
    callNewVideo(addNewVideo);
  };
  return (
    <div className="form-container">
      <p onClick={displayForm} className="text-primary">
        Add Video{" "}
      </p>
      <div className={showForm ? "" : "d-none"}>
        <div class="form-text-input">
          <label for="formGroupExampleInput" class="form-label">
            Title
          </label>
          <input
            onChange={handleTitleChange}
            type="text"
            class="form-control"
            id="formGroupExampleInput"
            placeholder="Enter your movie here.."
          />
        </div>
        <div class="form-text-input">
          <label for="formGroupExampleInput2" class="form-label">
            URL
          </label>
          <input
            onChange={handleUrlChange}
            type="text"
            class="form-control"
            id="formGroupExampleInput2"
            placeholder="Enter your link here.."
          />
          <button type="button" class="btn btn-primary" onClick={hideForm}>
            Cancel
          </button>
          <button type="button" class="btn btn-primary" onClick={addVideo}>
            Add Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
