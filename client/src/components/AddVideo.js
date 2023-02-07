import { useState } from "react";

function AddVideo({ addNewVideo }) {
  const [show, setShow] = useState(false);
  const [videoObject, setVideoObject] = useState({
    id: new Date().getTime(),
    title: "",
    url: "",
    rating: 0,
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (videoObject.title && videoObject.url) {
      addNewVideo(videoObject);
    }
    setVideoObject({
      id: new Date().getTime(),
      title: "",
      url: "",
      rating: 0,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <button onClick={() => setShow(false)}>Add Video</button>
      <div className={show ? "show" : undefined}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" value={videoObject.title} onChange={(e) => setVideoObject({ ...videoObject, title: e.target.value })} />
        </div>
        <div>
          <label htmlFor="url">URL</label>
          <input type="text" name="url" id="url" value={videoObject.url} onChange={(e) => setVideoObject({ ...videoObject, url: e.target.value })} />
        </div>
        <div>
          <button onClick={() => setShow(true)}>Cancel</button>
          <button type="submit">ADD</button>
        </div>
      </div>
    </form>
  );
}
export default AddVideo;
