import { useState } from "react";

const AddVideo = (prop) => {
 const [newvideo, setNewVideo] = useState([
   {
     id: 283634,
     title: "Learn Unity - Beginner's Game Development Course",
     url: "https://www.youtube.com/watch?v=gB1F9G0JXOo",
     rating: 211,
   },
 ]);
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
          <button onClick={(event) => prop.onClick(newvideo)}>Add</button>
          <button>Delete</button>
        </div>
      </form>{" "}
         </>
    );
 }








export default AddVideo;