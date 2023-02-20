import { useState } from "react";

const AddVideo = ({ addVideo }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isVideoAdded, setIsVideoAdded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !url.trim()) {
      alert("Please enter a title and URL");
      return;
    }

    if (!/^https?:\/\/(www\.)?youtube.com\//.test(url)) {
      alert("Please enter a valid YouTube URL");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, url }),
      });
      const data = await response.json();
      addVideo(title, url, data.id);
      setTitle("");
      setUrl("");
      window.location.reload();
      setIsVideoAdded(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {isVideoAdded && (
        <div className="success-message">Video added successfully!</div>
      )}
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form-header">Add your favorite video</h2>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title"
        ></input>
        <label>Url</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter Valid Youtube Url"
        ></input>
        <button type="submit">Add Video</button>
      </form>
    </div>
  );
};

export default AddVideo;
