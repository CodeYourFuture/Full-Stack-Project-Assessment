import React, { useState } from "react";

function LikeDislike() {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  return (
    <div>
      <button onClick={() => setLikes(likes + 1)}>Like</button>
      <button onClick={() => setDislikes(dislikes + 1)}>Dislike</button>
      <p>Likes: {likes}</p>
      <p>Dislikes: {dislikes}</p>
    </div>
  );
}

export default LikeDislike;
