import { useState } from "react";

export default function DeleteVideo({ video, setRefreshVideos }) {
  const [videoId] = useState(video.id);

  console.log(videoId);

  async function handleDelete(event) {
    // event.preventDefault();

    try {
      // console.log(videoId);

      const response = await fetch(
        `https://kristinadudnyk-fullstack-project.onrender.com/video/${videoId}`,
        // `http://localhost:4500/video/${videoId}`
        {
          method: "DELETE",
        }
      );
      // console.log(`http://localhost:4500/video/${videoId}`);

      console.log("handleDelete response:", response);

      const json = await response.json();
      console.log("handleDelete json:", json);

      // event.target.reset();

      setRefreshVideos((prevRefreshVideos) => !prevRefreshVideos);
    } catch (error) {
      console.log("handleDelete error:", error);
    }
  }

  return (
    <div>
      <button className="submit-button" onClick={handleDelete}>
        DELETE
      </button>
    </div>
  );
}
