import { useState } from "react";
const VideoForm = ({ setVideoForm, getAllVideos }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const newVideo = {
      title,
      url,
      rating: 0,
      date: new Date().getTime(),
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newVideo),
      });
      if (response.status !== 201) {
        throw new Error("Something went wrong!");
      }
      getAllVideos();
      setTitle("");
      setUrl("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="add-form" onSubmit={submitHandler}>
      <div className="input-container">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={title}
          id="title"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label htmlFor="url">Url</label>
        <input
          type="text"
          value={url}
          id="url"
          name="url"
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className="form-buttons">
        <button className="cancel-btn" onClick={() => setVideoForm(false)}>
          Cancel
        </button>
        <button className="add-btn" type="submit">
          Add
        </button>
      </div>
    </form>
  );
};

export default VideoForm;
