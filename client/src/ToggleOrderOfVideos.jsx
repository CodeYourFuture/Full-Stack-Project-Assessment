import { useState } from "react";
import { backEndLink } from "./config/config";

export default function ToggleOrderOfVideos({ refreshVideos, setVideos }) {
  const [order, setOrder] = useState(true);

  const handleToggleOrder = async () => {
    // Toggle the value of order state
    setOrder(!order);

    // Send a request to your server to update the order
    try {
      const orderQuery = order ? "asc" : "desc";
      const response = await fetch(
        `${backEndLink}?order=${orderQuery}`
        // `https://kristinadudnyk-fullstack-project.onrender.com/video?order=${orderQuery}`
      );
      const data = await response.json();
      console.log("handleToggleOrder in ToggleOrderOfVideos", data);
      setVideos(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="toggle_container">
      <label className="checkbox" htmlFor="checkbox">
        <input
          className="checkbox_inp"
          type="checkbox"
          id="checkbox"
          name="checkbox"
          onChange={handleToggleOrder}
        />
        <span className="checkbox_span">TO ASC</span>
      </label>
    </div>
  );
}
