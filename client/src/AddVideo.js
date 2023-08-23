import { useState } from "react";

function AddVideo(props) {
  return (
    <div>
      <h3>Add a video</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let title = e.target.children[0].value;
          let url = e.target.children[1].value;
          if (title !== "" && url !== "") {
            let uri = url.replace("watch?v=", "embed/");
            props.add(title, uri);
          }
        }}
      >
        <input type="text" placeholder="Enter title" />
        <input type="text" placeholder="Enter URL" />
        <button>Add Video</button>
      </form>
    </div>
  );
}

export default AddVideo;
