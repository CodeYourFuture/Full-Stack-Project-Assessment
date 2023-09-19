import { useState } from "react";
const AddVideo = ({ setRebuild, setVideoCards }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      title.trim() &&
      url.trim() &&
      url.startsWith("https://www.youtube.com/watch?v=")
    ) {
      const newVideo = {};
      newVideo.title = title;
      newVideo.url = url;
      console.log(newVideo);
      fetch("https://video-recomendations-server.onrender.com/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVideo),
      })
        .then((res) => res.json())
        .then((data) => {
          setVideoCards(data);
          setRebuild((rebuild) => rebuild + 1);
        })
        .catch((error) => console.log(error));
    } else {
      alert(
        "Please enter a valid Title and YouTube URL (e.g., Title: `Videos for Cats`, URL: https://www.youtube.com/watch?v=VIDEO_ID)"
      );
    }
    setUrl("");
    setTitle("");
  };
  return (
    <div
      className="modal fade"
      id="video"
      tabIndex="-1"
      aria-labelledby="videoLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="videoLabel">
              Add New Video
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p className="lead">
              Please provide the title and URL address of your favorite
              <span className="text-danger h3"> YouTube</span> video.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="video-title" className="col-form-label">
                  Video Title:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="videoTitle"
                  name="title"
                  placeholder="Example Title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="video-url" className="col-form-label">
                  URL:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="videoUrl"
                  name="url"
                  value={url}
                  placeholder="https://www.youtube.com/watch?v=_example..."
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={handleSubmit}
                >
                  Add Video
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddVideo;
