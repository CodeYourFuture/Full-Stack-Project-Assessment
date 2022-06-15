import React from "react";
import ValidateURL from "./ValidateURL.js";

const handleChange = () => {};

const ValidateTheVideo = (event) => {
    let title = document.forms["addvideoform"]["entered-title"].value;
    if (title === "")
         return false;
    
    let url = document.forms["addvideoform"]["entered-URL"].value;
    if (url === "")
        return false;
    event.preventDefault(); // Prevent Form Submission
    ValidateURL(url);
};

const HandleAddVideo = ({ addingVideo, setAddFunction }) => {
  if (!addingVideo) return null;

  return (
    <form name="addvideoform">
      <div className="addVideoDisplay">
        <div className="addVideoDisplay2">
          <p>Title</p>
          <input
            className="addVideoBars"
            type="text"
            autoComplete="off"
            id="enteredTitle"
            name="entered-title"
            onChange={handleChange}
            required
            maxLength="50"
          />
        </div>
        <div className="addVideoDisplay2">
          <p>URL</p>

          <input
            className="addVideoBars"
            type="text"
            autoComplete="off"
            id="enteredURL"
            name="entered-URL"
            onChange={handleChange}
            required
            maxLength="50"
          />
        </div>
        <div className="addButtonsDisplay">
          <div>
            <button className="button-32" onClick={() => setAddFunction(false)}>
              Cancel
            </button>
          </div>
          <div>
            <button
              className="button-32 addVideoButton"
              onClick={ValidateTheVideo}
            >
              ADD
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default HandleAddVideo;
