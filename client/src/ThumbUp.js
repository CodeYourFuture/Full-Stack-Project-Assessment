import { React, useState } from "react";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
const ThumbUp = () => {
  const [like, setLike] = useState(0);
  const clickLike = () => {
    setLike((like) => like + 1);
  };
  return (
    <div>
      <BsFillHandThumbsUpFill onClick={clickLike} className="thumb" />
      <span>{like}</span>
    </div>
  );
};
export default ThumbUp;
