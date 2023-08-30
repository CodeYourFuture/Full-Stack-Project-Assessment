
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

  const newVid = () => {
    if (title !== "" && url !== "") {
      let embedUrl = url.replace("https://youtu.be/", "https://www.youtube.com/embed/");
      console.log("Original URL:", url);
      console.log("Embed URL:", embedUrl);

      const newInput = {
        title: title,
        url: embedUrl,
        rating: 0,
      };
      onVidAdd(newInput);
      setTitle("");
      setUrl("");
    } else {
      alert("Please fill in all fields");
    }
  };

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
        Add
      </button>
      <button type="button" className="btn btn-warning">
        Cancel
      </button>
    </form>
  );
};

export default AddVideo;
