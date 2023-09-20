import { useState } from "react";

const AddVideo = ({ videos, setVideos }) => {
  const [videoName, setVideoName] = useState("");
  const [videoLink, setVideoLink] = useState("");
  function handleInputChange(event) {
    if (event.target.name === "name") {
      setVideoName(event.target.value);
    } else if (event.target.name === "url") {
      setVideoLink(event.target.value);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    let video = {
      title: videoName,
      url: videoLink,
    };
    if (video.url.startsWith("https://www.youtube.com/")) {
      fetch(`https://paulina-full-stack-project-server.onrender.com/videos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(video),
      })
        .then((res) => res.json())
        .then((data) => {
          setVideos(data);
        })
        .catch((error) => console.log(error));
    } else {
      alert(
        `Expected video URL to start with 'https://www.youtube.com/' but you provided '${video.url}' - please ensure fields are filled in correctly`
      );
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex flex-column align-items-center gap-2">
        <input
          className="form-control w-25"
          type="text"
          name="name"
          placeholder="Add a video name"
          size="30"
          value={videoName}
          onChange={handleInputChange}
        />
        <input
          type="url"
          name="url"
          placeholder="Add URL"
          pattern="https://.*"
          className="form-control w-25"
          size="30"
          required
          value={videoLink}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="btn btn-secondary btn-lg btn-block w-25 p-1"
          onClick={handleSubmit}
        >
          Add Video
        </button>
      </div>
    </form>
  );
};

export default AddVideo;
