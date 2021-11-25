// import React, { useState } from "react";
import AddButton from "./AddButton";
const AddVideo = ({ handleOnChangeAdd, handleSubmit, title, url }) => {
  return (
    <div>
      <div>
        <h1>Add Video</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Title
                <input
                  name="title"
                  type="text"
                  required=""
                  id="newTitle"
                  value={title}
                  onChange={handleOnChangeAdd}
                ></input>
              </label>
            </div>
            <div>
              <label>
                URL
                <input
                  name="url"
                  type="text"
                  required=""
                  id="newUrl"
                  value={url}
                  onChange={handleOnChangeAdd}
                ></input>
              </label>
            </div>
            <AddButton />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVideo;
