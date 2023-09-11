import { useState } from "react";

export default function SetRating({ ratin, setRating, video }) {
  const [counter, setCounter] = useState(video.rating);

  return (
    <div>
      <button onClick={() => setCounter(counter + 1)}>video.rating +</button>
      <h3>{counter}</h3>
      <button onClick={() => setCounter(counter - 1)}>video.rating -</button>
    </div>
  );
}
