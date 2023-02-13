import React, { useState } from "react";
import VideoCard from "./VideoCard";

export default function VideoVote({ rating }) {
  
  console.log(rating, 'JJJJJJJJJJJJJJJJJJJJJJJJJJJJ')
  const [vote, setVote] = useState(rating);

  return (
    <div>
      <button
        type="button"
        class="btn btn-success m-3"
        onClick={() => setVote(vote + 1)}
      >
        +
      </button>
      <label>{vote} Votes </label>
      <button
        type="button"
        class="btn btn-danger m-3"
        onClick={() => setVote(vote - 1)}
      >
        -
      </button>
    </div>
  );
}
