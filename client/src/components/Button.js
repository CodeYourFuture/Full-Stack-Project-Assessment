import React, { useState } from "react";
import Button from "react-bootstrap/Button";

function Button(props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const postData = {title: title, url: url};
     const res = await fetch(`http://localhost:5000/`, {
       method: "POST",
       headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
       },
       body: JSON.stringify(postData),
     });
     await res.json();



    props.onVideoAdded(
      title,url);
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

export default Button;