import { useState } from "react";

const AddVideo = (prop) => {
  return (
    <>
   <h2 className="addVideo">Add Video</h2>
      <form className="addvideo-form" onSubmit={(e) => e.preventDefault()}>
        <div className="addvideo">
          <label htmlFor="title" name="title">
            Title:
            <input className="input" type="text" name="title" />
          </label>
        </div>
        <div className="addvideo">
          <label htmlFor="url" name="url">
            {" "}
            URL:
            <input className="input" type="text" name="url" />
          </label>
        </div>

        <div className="addvideo">
          <button onClick={(event) => prop.onClick()}>Add</button>
          <button>Delete</button>
        </div>
      </form>{" "}
         </>
    );
 }








export default AddVideo;