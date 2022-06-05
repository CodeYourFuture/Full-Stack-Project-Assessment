import React, { useState } from "react";
import "./App.css";
//import data from "./data.json";
import ButtonAddVideo from "./ButtonAddVideo";

export default function AddVideo(props) {
  const [addTitle, setAddTitle] = useState("");
  const [addUrl, setAddUrl] = useState("");

  return (
    <div>
      <div className="">
        <h3 className="add-video-title">Add video</h3>
      </div>

      <div className="col-sm-12">
        <form
          className="form-group search-box mt-4"
          onSubmit={(event) => {
            event.preventDefault();
            props.addNew({
              title: addTitle,
              url: addUrl,
            });
            setAddTitle(""); //clear input after sending data
            setAddUrl(""); //clear input after sending data
          }}
        >
          <label htmlFor="addTitle">Title</label>
          <div className="search-row mb-3">
            <input
              type="text"
              id="addTitle"
              className="form-control"
              placeholder=""
              value={addTitle}
              onChange={(event) => {
                setAddTitle(event.target.value);
              }}
            />
          </div>

          <label htmlFor="addUrl">Add url</label>
          <div className="search-row mb-3">
            <input
              type="text"
              id="addUrl"
              className="form-control"
              placeholder=""
              value={addUrl}
              onChange={(event) => {
                setAddUrl(event.target.value);
              }}
            />
          </div>
          <ButtonAddVideo />
        </form>
      </div>
    </div>
  );
}
