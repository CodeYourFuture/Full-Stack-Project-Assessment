import { React, useState } from "react";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { BsFillHandThumbsDownFill } from "react-icons/bs";
const ThumbUpDown = (props) => {
  const [like, setLike] = useState(0);
  const clickLike = () => {
    setLike((like) => like + 1);
  };
  const clickDisLike = () => {
    setLike((like) => like - 1);
  };

  return (
    <div>
      <BsFillHandThumbsUpFill onClick={clickLike} className="thumb" />
      <span>{like}</span>
      <span>Vote</span>
      <BsFillHandThumbsDownFill onClick={clickDisLike} className="thumb" />
      <h4>Rating:{props.rating + like}</h4>
    </div>
  );
};

export default ThumbUpDown;
