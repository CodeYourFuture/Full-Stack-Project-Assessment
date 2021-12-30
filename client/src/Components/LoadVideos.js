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
    fetch(`http://localhost:5000`)
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
    /**
     * 
      1. Create video object without ID field.
      2. post it to the server
        2.1  server might check if the same video with the same ID already exists,
        2.2  if not it should generate new unique ID for it
        2.3  then server adds it to allVideos object (which is going to be a database connection in some future)
        2.4  lastly, server returns that ID as response body with status code = 200
      3. client receives OK200 {id: .....} - which means video has been successfully added to the server/database
      4. client takes that ID and adds to the new video object
      5. lastly client renders new video component on the screen
     */

    const newVideo = { title, url, rating: 0 };
    if(matchYoutubeUrl(newVideo.url)) {
      // window.alert("Valid YouTube video will be added! Click OK!");
      
      // (async () => {
      //     const rawResponse = await fetch("localhost:5000", {
      //       method: "POST",
      //       headers: {
      //         "Accept": "application/json",
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify(newVideo),
      //     });
      //     // TODO: check if there are any errors
      //     // is rawResponse.status == 200 ?
      //     const response = await rawResponse.json();
      //     console.log(response);
          
      //     Object.assign(newVideo, {id: response.body.id});
      //     const newVids = [...videos];
      //     newVids.push(newVideo);
      //     setVideos(newVids);
      //   }
      // )();

      fetch("http://localhost:5000", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVideo),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          Object.assign(newVideo, { id: data.id });
          const newVids = [...videos];
          newVids.push(newVideo);
          setVideos(newVids);
        })
        .catch((error) => console.error(error));
    }
}


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
