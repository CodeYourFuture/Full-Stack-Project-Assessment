import { useState } from "react";

export default function AddingItem({addVideo}) {
    const [isHidden, setIsHidden] = useState(true);
    const [newVideo, setNewVideo] = useState({
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
    const pattern =
      /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/;
      const pattern2 =
        /^(https?:\/\/)?(www\.)?youtube\.com\/embed\/[a-zA-Z0-9_-]{11}$/;
    //   https://www.youtube.com/embed/dQw4w9WgXcQ
      if (pattern.test(newVideo.url) || pattern2.test(newVideo.url)) {
        const time = new Date();
        const formattedTime = time.toISOString(); 
         addVideo({...newVideo, dateTime: formattedTime});
         setNewVideo({
           title: "",
           url: "",
           rating: 0,
         });
      } else {
        alert("Not a valid YouTube URL");
      }
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
                required
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