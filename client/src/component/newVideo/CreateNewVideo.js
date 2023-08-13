import { React, useState } from "react";
import DataVideos from "../../exampleresponse.json";

const CreateNewVideo = () => {
  const [videos, setVideos] = useState([...DataVideos]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const titleHandler = (e) => setTitle(e.target.value);
  const urlHandler = (e) => setUrl(e.target.value);

  const clickHandler = () => {
    const newVid = {};
    newVid.id = videos.length + 1;
    newVid.title = title;
    newVid.url = url;

    setVideos(videos.push(newVid));
  };

  return (
    <div className="login-div">
      <h1>Create New Video</h1>
      <div className="login-box">
        <form>
          <div className="user-box">
            <input type="" onChange={titleHandler} value={title} />
            <label>Video Title</label>
          </div>
          <div className="user-box">
            <input type="" onChange={urlHandler} value={url} />
            <label>Url</label>
          </div>
          <center>
            <button className="btn-submit" onCanPlay={clickHandler}>
              SEND
              <span></span>
            </button>
          </center>
        </form>
      </div>
    </div>
  );
};
export default CreateNewVideo;
