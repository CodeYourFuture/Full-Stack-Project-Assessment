import { useState } from "react";

export default function VideossCard({ videos }) {
  const [counter, setCounter] = useState(videos.rating);
  return (
    <>
      {videos.map((video) => (
        <div key={video.id}>
          <h2>{video.title}</h2>
          <iframe
            title={video.title}
            src={video.url.replace("watch?v=", "embed/")}
            width="500"
            height="281"
          />
          <div>
            <button onClick={() => setCounter(counter + 1)}>
              video.rating +
            </button>
            <h3>{counter}</h3>
            <button onClick={() => setCounter(counter - 1)}>
              video.rating -
            </button>
          </div>
          <div>
            <button>delete</button>
          </div>
        </div>
      ))}
    </>
  );
}
