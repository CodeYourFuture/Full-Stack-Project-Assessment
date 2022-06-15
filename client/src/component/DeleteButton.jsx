import React, { useState } from "react";

function Delete({ videoId }) {
  const [removedId, setRemovedId] = useState([]);

  function handleClick() {
    setRemovedId([...removedId, videoId]);
  }

  return (
    <div>
      <button onClick={handleClick}>Remove</button>
    </div>
  );
}
export default Delete;
