import { useState, useEffect } from "react";
import Card from "./Card";

function Cards() {
  const [videos, createVideos] = useState([]);
  const [url, createUrl] = useState("");
  const [title, createTitle] = useState("");

  useEffect(() => {
    fetch('/videos')
      .then((res) => res.json())
      .then((data) => createVideos(data))
      .catch((error) => console.log(error));
  }, []);

  const removeElement = (i) => {
    let newVideos = [...videos];
    newVideos.splice(i, 1);
    createVideos(newVideos);
  };
  const updateTitle = (event) => {
    createTitle(event.target.value);
  };

  const updateUrl = (event) => {
    createUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let maxID = Math.max(...videos.map((c) => c.id));
    const newVideo = {
      id: ++maxID,
      title,
      url,
      rating: 0,
    };
    createVideos((videos) => {
      return [...videos, newVideo];
    });
    createTitle("");
    createUrl("");
  };

  useEffect(() => {
    console.log(videos);
  }, [videos]);

  return (
    <div>
      <div className="addVideo">
        <h4 className="newVideoTitle">Add a New YouTube Video</h4>

        <form>
          <label>
            Title
            <input type="text" value={title} onChange={updateTitle} />
          </label>
          <label>
            URL
            <input type="text" value={url} onChange={updateUrl} />
          </label>
          <button onClick={handleSubmit} type="submit">
            ➕
          </button>
        </form>
      </div>
      <div className="Cards">
        {videos.map((video, index) => {
          const { id, rating, url, title } = video;
          return (
            <Card
              key={id}
              title={title}
              url={url}
              rating={rating}
              index={index}
              removeElement={removeElement}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Cards;
