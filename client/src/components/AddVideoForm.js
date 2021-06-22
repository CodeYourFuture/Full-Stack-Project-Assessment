import { useRef } from "react";

const AddVideoForm = ({ handleAddVideo }) => {
  const titleRef = useRef(null);
  const urlRef = useRef(null);

  return (
    <form>
      <label htmlFor="movie-title">
        Title
        <input ref={titleRef} type="text" name="movie-title" id="movie-title" />
      </label>
      <label htmlFor="movie-url">
        URL
        <input ref={urlRef} type="text" name="movie-url" id="movie-url" />
      </label>
      <br />
      <button>CANCEL</button>
      <button
        onClick={(event) => {
          event.preventDefault();
          handleAddVideo(titleRef.current.value, urlRef.current.value);
        }}
      >
        ADD
      </button>{" "}
      <br />
    </form>
  );
};

export default AddVideoForm;
