import { useState } from "react";
import { BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";

function SingleVideo({ id, title, url, rating, handleRemove }) {
  const [count, setCount] = useState(rating);
  const link = url.slice(-11);

  return (
    <div className="single-video">
      <iframe src={`https://www.youtube.com/embed/${link}`} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      <h6>{title}</h6>
      <div className="card-btn-container">
        <button className="thumbs-down-btn" onClick={() => setCount(+count - 1)}>
          <i>
            <BsHandThumbsDown />
          </i>
        </button>
        <p>{count}</p>
        <button onClick={() => setCount(+count + 1)}>
          <i>
            <BsHandThumbsUp />
          </i>
        </button>
      </div>
      <button className="remove-btn" onClick={() => handleRemove(id)}>
        {<AiOutlineCloseCircle />}
      </button>
    </div>
  );
}
export default SingleVideo;
