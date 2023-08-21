import React, { useState } from "react";
import "../index.css";

const AddVideo = ({ onVidAdd }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const titleChange = (event) => {
    setTitle(event.target.value);
  };

  const urlChange = (event) => {
    setUrl(event.target.value);
  };

  // const newVid = () => {
  //   const newInput = {};
  //   onVidAdd(newInput);
  //   let newId = newInput.length + 1;
  //   newInput.id = newId;
  //   newInput.title = title;
  //   newInput.url = getVideoIdFromUrl();
  //   newInput.rating = 0;
  // };
  const newVid = () => {
    const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+(&\S+)?$/;
  if (!title ||!youtubeUrlRegex.test(url)) {
    alert("Please write the title or Invalid URL");
    return;
  }
  const newInput = {
    title: title,
    url: url,
  };

      onVidAdd(newInput);
      setTitle("");
      setUrl("");
    }


  return (
    <form>
      <div className="form-group row">
        <label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">
          Title
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            value={title}
            onChange={titleChange}
            className="form-control form-control-sm"
            id="colFormLabelSm"
            placeholder="Title"
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">
          URL
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            value={url}
            onChange={urlChange}
            className="form-control form-control-sm"
            id="colFormLabelSm"
            placeholder="URL"
          />
        </div>
      </div>
      <button onClick={newVid} type="button" className="btn btn-success">
        {" "}
        Add{" "}
      </button>
      <button type="button" className="btn btn-warning">
        Cancel
      </button>
    </form>
  );
};

export default AddVideo;
