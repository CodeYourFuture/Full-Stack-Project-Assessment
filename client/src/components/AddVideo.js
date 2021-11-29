import React, { useState } from "react";
import AddButton from "./AddButton";

const AddVideo = ({ setAllVideo }) => {
  const [addNewVc, setAddNewVc] = useState({ title: "", url: "" });
  const { title, url } = addNewVc;

  const uniId = url.length + title.length;
  const HandleOnChangeAdd = (event) => {
    event.preventDefault();
    const key = event.target.getAttribute("name");
    setAddNewVc({ ...addNewVc, id: uniId, [key]: event.target.value });
  };
  const HandleSubmit = (event) => {
    event.preventDefault();
    setAllVideo((allVc) => allVc.concat(addNewVc));
  };
  return (
    <div>
      <div>
        <h1>Add Video</h1>
        <div>
          <form onSubmit={HandleSubmit}>
            <div>
              <label htmlFor="title">
                Title
                <input
                  name="title"
                  type="text"
                  required=""
                  id={""}
                  value={title}
                  onChange={HandleOnChangeAdd}
                ></input>
              </label>
            </div>
            <div>
              <label htmlFor="url">
                URL
                <input
                  name="url"
                  type="text"
                  required=""
                  id={""}
                  value={url}
                  onChange={HandleOnChangeAdd}
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
