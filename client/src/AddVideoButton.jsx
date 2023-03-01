import React, { useState } from "react";
import Button from "react-bootstrap/Button";

function AddVideoButton(props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onVideoAdded(
      title,
      "https://youtube.com/embed/" +
        url
          .match(/v=([^&]+)/g)
          .join()
          .slice(2)
    );
    setTitle("");
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        style={{ margin: "5px" }}
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
      />
      <input
        style={{ margin: "5px" }}
        type="text"
        placeholder="URL"
        value={url}
        onChange={handleUrlChange}
      />
      <Button style={{ margin: "5px" }} size="sm" variant="dark" type="submit">
        Add Video
      </Button>
    </form>
  );
}


export default AddVideoButton;