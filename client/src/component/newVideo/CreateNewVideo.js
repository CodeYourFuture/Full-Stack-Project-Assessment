import { React, useState } from "react";
import axios from "axios";
import "../newVideo/create.css";

const CreateNewVideo = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState(false);

  const urlForNewVideo =
    "https://beko-video-project-fs-assessment-backend.onrender.com/videos/data/create";

  const clickHandler = async (e) => {
    e.preventDefault();

    if (!title || !url) {
      setError(true);
      return false;
    }

    try {
      const res = await axios.post(urlForNewVideo, {
        title,
        url,
      });
      if (res.status === 201) {
        alert("New Video has been add successfully");
      } else {
        alert("New Video does not add successfully");
      }
    } catch (error) {
      console.log(error);
    }
    setTitle("");
    setUrl("");
  };

  return (
    <div className="login-div">
      <h1>Create New Video</h1>
      <div className="login-box">
        <form>
          <div className="user-box">
            {error && !title && (
              <span className="error-msg">You Must Enter Video Title..!!</span>
            )}

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Video Title</label>
          </div>

          <div className="user-box">
            {error && !url && (
              <span className="error-msg">
                YouTube URL Must be Provided as Embed...!!
              </span>
            )}

            <input
              type=""
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <label>Url</label>
          </div>

          <center>
            <button className="btn-submit" onClick={clickHandler}>
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
