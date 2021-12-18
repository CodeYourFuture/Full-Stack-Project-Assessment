import { useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import NumberOfVote from "./NumberOfVote";
import "./LoadVideos.css";
var moment = require('moment');

function LoadVideos() {
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [search, setSearch] = useState("");
  const myDate = moment().format("lll");
  useEffect(() => {
    fetch(`http://localhost:5000/`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return null;
      })
      .then((data) => {
        data.sort((a, b) => {
          return b.rating - a.rating;
        });
        setVideos(data);
      })
      .catch((error) => {
        console.log("The error is " + error);
        // setVideos([]);
      });
  }, []);

  function matchYoutubeUrl(url) {
    var p =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) {
      return url.match(p)[1];
    }
    return false;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const oneVideo = { title, url, rating: 0 };
    if(matchYoutubeUrl(oneVideo.url)){
    const newVids = [...videos];
    newVids.push(oneVideo);
    setVideos(newVids);
    window.alert("Valid YouTube video will be added! Click OK!");
  }}


  function handleSearch(e) {
    e.preventDefault();
    const keywords = e.target.value.toLocaleLowerCase();
    setSearch(keywords);
    const newVids = [...videos]; //the latest array
    const filtered = newVids.filter((video) => {
      return video.title.toLocaleLowerCase().includes(keywords);
    });
    setVideos(filtered);
  }

  const deleteVideo = (id) => {
    setVideos(videos.filter((video) => video.id !== id));
  };

  return (
    <div>
      <div className="add-video">
        Add Video
        <form id="form" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Title </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              name="title"
              type="text"
              value={title}
              required
            ></input>
          </div>
          <div>
            <label>URL</label>
            <input
              onChange={(e) => setUrl(e.target.value)}
              className="input"
              name="url"
              type="text"
              value={url}
              required
            ></input>
          </div>
          <div>
            <button className="btn btn-danger input" type="submit">
              ADD
            </button>
          </div>
        </form>
      </div>

      <div>
        <label>Search</label>
        <input
          onChange={(e) => {
            handleSearch(e);
          }}
          className="input"
          name="words"
          type="text"
          value={search}
        ></input>
      </div>

      <div className="card-contener">
        {videos.map((video, i) => {
          return (
            <div key={video.id} className="card">
              <div className="video">
                <ReactPlayer url={video.url} />
              </div>
              <div className="title">{video.title}</div>
              <p>Uploaded on {myDate}</p>
              <div className="vote">
                <NumberOfVote video={video} />
              </div>
              <button
                className="delete-btn"
                onClick={() => {
                  deleteVideo(video.id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default LoadVideos;
