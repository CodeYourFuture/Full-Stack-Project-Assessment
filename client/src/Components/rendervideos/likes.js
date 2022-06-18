import React, { useState } from "react";

const Likes = () => {
  const [countLike, setCountLike] = useState(0);

  return (
    <div>
      <button onClick={() => setCountLike((v) => (v += 1))}>Up vote</button>
      {countLike}
      <button onClick={() => setCountLike((v) => (v -= 1))}> Down vote</button>
    </div>
  );
};

export default Likes;
