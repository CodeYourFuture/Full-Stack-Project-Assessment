import { useState } from "react";
const VideoSubmissionForm = (props) => {
  // give your video a title
  // enter the the URL
  //submit button adds the video to the data clone
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  return (
    <form id="add-video-form">
      <label htmlFor="title-input">Title:</label>
      <input
        type="text"
        id="title-input"
        placeholder="Title"
        onChange={(e) => {
          setCurrentTitle(e.target.value);
        }}
      />

      <label htmlFor="url-input">URL:</label>
      <input
        type="text"
        id="url-input"
        placeholder="URL"
        onChange={(e) => {
          setCurrentUrl(e.target.value);
        }}
      />

      <button type="button" id="add-video-button" onClick={() => {
        props.addVidFunc({title: currentTitle, url: currentUrl});
      }}>
        Add
      </button>
      <button type="button" id="cancel-submission-button">Cancel</button>
    </form>
  );
};
export default VideoSubmissionForm;
