import React from "react";
import AddButton from "./AddButton";

const AddVideo = () => {
  return (
    <div>
      <div>
        <h1>Add Video</h1>
        <div>
          <form>
            <label>
              Title
              <input name="title" type="text" required=""></input>
            </label>
          </form>
        </div>
        <div>
          <form>
            <label>
              URL
              <input name="url" type="text" required=""></input>
            </label>
          </form>
        </div>
        <AddButton />
      </div>
    </div>
  );
};

export default AddVideo;
