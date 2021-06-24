import React, { useState, useContext } from "react";
import { AddCircleOutline } from "@material-ui/icons";
import { v4 as uuidv4 } from "uuid";
import { VideoContext } from "../contexts/VideoContext";

function AddVideo() {
  const { videoList, setVideoList } = useContext(VideoContext);
  const [urlId, setUrlId] = useState("");
  const [title, setTitle] = useState("");

  function handleAdd() {
    if (!urlId.length > 0 || !title.length > 0) {
      alert("Please add valid Title or Video-Id");
      return;
    }
    const newVideo = [
      {
        id: uuidv4(),
        title: title,
        url: `https://www.youtube.com/watch?v=${urlId}`,
        rating: 0,
      },
    ];
    setVideoList(newVideo.concat(videoList));
  }

  return (
    <div className="border rounded row col-10 align-items-center justify-content-center">
      <div className="m-1 col-12 col-md-7">
        <div className="input-group">
          <span className="input-group-text" id="basic-addon3">
            https://www.youtube.com/watch?v=
          </span>
          <input
            placeholder="poQXNp9ItL4"
            type="text"
            className="form-control"
            id="basic-url"
            aria-describedby="basic-addon3"
            onChange={(e) => setUrlId(e.target.value)}
          />
        </div>
      </div>
      <div className="m-1 col-12 col-md-3">
        <div className="input-group ">
          <span className="input-group-text" id="basic-addon3">
            Title
          </span>
          <input
            placeholder="Name of video"
            type="text"
            className="form-control"
            id="basic-url"
            aria-describedby="basic-addon3"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      <div onClick={handleAdd} className="col-12 col-md-1">
        <AddCircleOutline />
      </div>
    </div>
  );
}

export default AddVideo;
