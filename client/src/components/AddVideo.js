import React, { useState} from "react";
import PostVideo from "./PostNewVideo";
import AddButton from "./AddButton";

const AddVideo = ({ setAllVideo, FetchData}) => {
  //--------Get value and assign in object key value------------//
  const [addNewVc, setAddNewVc] = useState({ title: "", url: "" });
  const { title, url } = addNewVc;
  const HandleOnChangeAdd = (event) => {
    event.preventDefault();
    const key = event.target.getAttribute("name");
    setAddNewVc({ ...addNewVc,[key]: event.target.value });
  };
  //-------------------------------------------------------------//
  //--------On submit add new video data on server and re-render the page----//
  const HandleSubmit = (event) => {
    event.preventDefault();
    PostVideo(addNewVc)
      .then(() => FetchData())
      .then((data) => setAllVideo(data));
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
