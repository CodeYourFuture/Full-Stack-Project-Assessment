import React, { useState } from "react";
import AddButton from "./AddButton";
import sampleData from "../data/exampleresponse.json";
const AddVideo = () => {
  const [addNewVc, setAddNewVc] = useState({ title: "", url: "" });
  const { title, url } = addNewVc;
  const handleOnChange = (event) => {
    setAddNewVc({ ...addNewVc,[event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    sampleData.push(addNewVc);
    console.log(sampleData);
  };
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
                  onChange={handleOnChange}
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
                  onChange={handleOnChange}
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
