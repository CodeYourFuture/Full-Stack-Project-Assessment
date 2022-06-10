import React from "react";

const FormAddVideo = (props) => {
  return (
    <form>
      <label htmlFor="title">
        Title
        <input
          value={props.title}
          type="text"
          placeholder="Video Title"
          onChange={(event) => props.setTitle(event.target.value)}
          required
        />
      </label>
      <label htmlFor="url">
        URL
        <input
          value={props.url}
          type="text"
          placeholder="Video URL"
          onChange={(event) => props.setUrl(event.target.value)}
          required
        />
      </label>
      <button onClick={props.handleSubmit}>Add video</button>
      <button onClick={props.handleCancel}>Cancel</button>
    </form>
  );
};

export default FormAddVideo;
