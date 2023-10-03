import React, { useState } from "react";
import { FormInput } from "./FormInputText";

const AddVideo = ({ update, setUpdate }) => {
  const [newTitle, setTitle] = useState("");
  const [newUrl, setUrl] = useState("");
  const [titleError, setTitleError] = useState("");
  const [urlError, setUrlError] = useState("");

  const addVideo = (e) => {
    e.preventDefault();
    if (newTitle === "") {
      e.preventDefault();
      setTitleError("Please input a valid title");
    } else if (newUrl === "" || !newUrl.includes("youtube.com/")) {
      e.preventDefault();
      setUrlError("Please input a valid url");
    } else {
      fetch("https://michellejanay-cyf-video-app.onrender.com/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, url: newUrl }),
      })
        .then((res) => res.json())
        .then(() => {
          setTitle("");
          setUrl("");
        })
        .then(() => {
          setUpdate(update + 1);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="add-card">
      <div className="add-video-card">
        <form onSubmit={addVideo}>
          <FormInput
            htmlFor="title"
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
              setTitleError("");
            }}
            value={newTitle}
            error={titleError}
          />
          <FormInput
            htmlFor="url"
            type="text"
            onChange={(e) => {
              setUrl(e.target.value);
              setUrlError("");
            }}
            value={newUrl}
            error={urlError}
          />
          <button className="btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddVideo;
