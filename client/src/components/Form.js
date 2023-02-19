import React from "react";
import { useState } from "react";

const Form = ({ callNewVideo }) => {
  const [showForm, setShowForm] = useState(true);
  const hideForm = (e) => {
    e.preventDefault();
    setShowForm(false);
  };
  const displayForm = (e) => {
    e.preventDefault();
    setShowForm(true);
  };
  
  const addVideo = () => {
    let newUrl = document.getElementById("formGroupExampleInput2").value;
    let newTitle = document.getElementById("formGroupExampleInput").value;
    let addNewVideo = {
      url: newUrl,
      title: newTitle,
      id: Math.random() * 10000,
    };
    callNewVideo(addNewVideo);
  };
  return (
    <div>
      <p onClick={displayForm} className="text-primary">
        Add Video{" "}
      </p>
      <div className={showForm ? "" : "d-none"}>
        <div class="mb-3 col-sm-3">
          <label for="formGroupExampleInput" class="form-label">
            Title
          </label>
          <input
            type="text"
            class="form-control"
            id="formGroupExampleInput"
            placeholder="Enter your movie here.."
          />
        </div>
        <div class="mb-3 col-sm-3">
          <label for="formGroupExampleInput2" class="form-label">
            URL
          </label>
          <input
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
