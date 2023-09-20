import { useState } from "react";

export default function UpdateRating({ video }) {
  const [counter, setCounter] = useState(video.rating);

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `https://kristinadudnyk-fullstack-project.onrender.com/${video.id}`,

        // `http://localhost:4500/video/${video.id}`
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rating: counter }),
        }
      );
      // console.log("handleSubmit response:", response);

      // const json = await response.json();
      // console.log("handleSubmit json:", json);
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
    <div>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      <h3>{counter}</h3>
      <button onClick={() => setCounter(counter - 1)}>Decrement</button>
      <button onClick={handleUpdate}>Update Rating</button>
    </div>
  );
}
