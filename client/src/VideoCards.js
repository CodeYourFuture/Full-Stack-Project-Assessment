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

  const removeElement = (id) => {
    console.log(typeof id);
    let newVideos = [...videos];
    fetch(`/videos/${id}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
    })
    .then((res)=> res.json())
    .then((data) =>console.log(data))
    .catch((error)=> console.log(error))
    newVideos = newVideos.filter(video => video.id !== id) 
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
 
    const newVideo = {
      title,
      url,
      rating: 0,
    };

     fetch("/videos", {
      method: "POST",
      body: JSON.stringify(newVideo),
      headers: {"Content-Type": "application/json"} 
    })
    .then((res)=> res.json())
    .then((data)=>console.log(data))
    .catch((error)=> console.log(error))
    let updatedVideos = [...videos, newVideo];

    createVideos(updatedVideos);
    createTitle("");
    createUrl("");
  };


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
             return (
            <Card
              id={video.id}
              title={video.title}
              url={video.url}
              rating={video.rating}
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
