import { useState } from "react";

function Video() {
  let [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(!show)}>Add Video</button>
      <div className={show ? "show" : undefined}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" />
        </div>
        <div>
          <label htmlFor="url">URL</label>
          <input type="text" name="url" id="url" />
        </div>
        <div>
          <button onClick={() => setShow(true)}>Cancel</button>
          <button>ADD</button>
        </div>
      </div>
    </div>
  );
}
export default Video;
