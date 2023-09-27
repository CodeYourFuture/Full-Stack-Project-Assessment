import { useState } from "react";
import DeleteVideo from "./DeleteVideo";

export default function UpdateRating({ video, setRefreshVideos }) {
  const [counter, setCounter] = useState(video.rating);

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `https://kristinadudnyk-fullstack-project.onrender.com/video/${video.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rating: counter }),
        }
      );
      if (response.ok) {
        console.log("Resource updated successfully");
      } else {
        console.error("Failed to update resource");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="rating-container">
      <div className="rating-values">
        <button
          onClick={() => setCounter((prevCounter) => prevCounter + 1)}
          className="rating-button box"
        >
          👍
        </button>
        <h3>{counter}</h3>
        <button
          onClick={() => setCounter((prevCounter) => prevCounter - 1)}
          className="rating-button box"
        >
          👎
        </button>
      </div>

      <button onClick={handleUpdate} className="update-button box btn">
        Update Rating
      </button>
      {/* <DeleteVideo setRefreshVideos={setRefreshVideos} video={video} /> */}
    </div>
  );
}
