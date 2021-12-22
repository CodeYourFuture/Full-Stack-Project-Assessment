import React, { useState } from "react";

const AddVideo = (props) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  //console.log(props.videos);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };
  const lastIndex = props.data.length - 1;
  const lastItem = props.data[lastIndex];
  const lastId = lastItem.id;
  const newId = lastId + 1;

  const handleFormSubmit = (event) => {
    event.preventDefault();

    let newVideo = {
      id: newId,
      title: title,
      url: url,
      rating: 0,
    };
    console.log(props.data);
    let addedVideo = props.data.push(newVideo);
    props.setVideos(addedVideo);
  };

  return (
    <div>
      {
        <form onSubmit={handleFormSubmit}>
          <label>
            Title
            <input
              type="text"
              name="title"
              placeholder="Type to add your video title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          <label>
            URL
            <input
              type="url"
              name="url"
              placeholder="Add the Video URL"
              value={url}
              onChange={handleUrlChange}
            />
          </label>
          <button>Add Video</button>
        </form>
      }
    </div>
  );
};

export default AddVideo;
