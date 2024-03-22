import { useRef } from "react";
import "./AddVideoForm.css";

const AddVideoForm = ({ handleAddVideo }) => {
  const titleRef = useRef(null);
  const urlRef = useRef(null);

  return (
    <form className="add-video-form">
      <div className="form-inputs-container">
        <h2>Paste url and title to add a new video</h2>
        <label htmlFor="movie-title">
          Title
          <input
            ref={titleRef}
            type="text"
            name="movie-title"
            id="movie-title"
          />
        </label>
        <label htmlFor="movie-url">
          URL
          <input ref={urlRef} type="text" name="movie-url" id="movie-url" />
        </label>
      </div>
      <div className="form-buttons">
        <button
          className="add-video-btn btn"
          onClick={(event) => {
            event.preventDefault();
            handleAddVideo(titleRef.current.value, urlRef.current.value);
          }}
        >
          ADD
        </button>
      </div>
    </form>
  );
};

export default AddVideoForm;