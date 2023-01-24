import React, { useState } from "react";

const VideoAdd = ({ setvideos, videos }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

const handleSubmit = async (event) => {
  event.preventDefault();

  const newVideo = {
    id: Date.now(),
    title: title,
    url: url,
    rating: 0
  };
   setvideos(prevVideos => [...prevVideos, newVideo])
};

/*   try {
    const response = await fetch('./exampleresponse.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newVideo)
    });
    const data = await response.json();
    setvideos(data);
  } catch (error) {
    console.error('Error:', error);
  }
}; */

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <br />
      <label>
        URL:
        <input
          type="text"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Add Video</button>
    </form>
  );
};

export default VideoAdd;
