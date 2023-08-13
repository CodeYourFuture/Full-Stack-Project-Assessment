import { useState } from "react";

export default function AddingItem({addVideo, id}) {
    const [isHidden, setIsHidden] = useState(true);
    const [newVideo, setNewVideo] = useState({
    id: id+1,
    title: "",
    url: "",
    rating: 0
  });

  const handleTitleChange = (e) => {
    setNewVideo({ ...newVideo, title: e.target.value });
  };

  const handleUrlChange = (e) => {
    setNewVideo({ ...newVideo, url: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addVideo(newVideo);
    setNewVideo({
      id: id + 1, 
      title: "",
      url: "",
      rating: 0,
    });
  };
    return (
      <div className="adding-item">
        <h3
          onClick={(e) => setIsHidden(false)}
          onKeyDown={(e) => setIsHidden(false)}
          tabIndex={0}
        >
          Add Video
        </h3>
        <div className={isHidden ? "hidable hidden" : "hidable"}>
          <form>
            <label>
              Title
              <input
                type="text"
                name="title"
                value={newVideo.title}
                onChange={handleTitleChange}
              ></input>
            </label>
            <label>
              URL{" "}
              <input
                type="text"
                name="url"
                value={newVideo.url}
                onChange={handleUrlChange}
              ></input>
            </label>
          </form>
          <div className="button-container">
            <button name="Cancel"
              type="button"
              className="btn btn-warning add-div-btn"
              onClick={(e) => setIsHidden(true)}
              onKeyDown={(e) => setIsHidden(true)}
            >
              Cancel
            </button>
            <button name="Add"
              className="btn btn-success add-div-btn"
              type="submit"
              onClick={handleSubmit}
              onKeyDown={handleSubmit}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
}