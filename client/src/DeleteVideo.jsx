import { useState } from "react";
import { backEndLink } from "./config/config";

export default function DeleteVideo({ video, setRefreshVideos }) {
  const [videoId] = useState(video.id);

  // console.log(videoId);

  async function handleDelete(event) {
    // event.preventDefault();

    try {
      // console.log(videoId);

      const response = await fetch(`${backEndLink}/${videoId}`, {
        method: "DELETE",
      });
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
      <button className="delete-button box btn" onClick={handleDelete}>
        DELETE
      </button>
    </div>
  );
}
