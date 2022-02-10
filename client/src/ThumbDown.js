import { React, useState } from "react";
import { BsFillHandThumbsDownFill } from "react-icons/bs";
const ThumbDown = () => {
  const [disLike, setDisLike] = useState(0);
  const clickDisLike = () => {
    setDisLike((disLike) => disLike + 1);
  };
  return (
    <div>
      <BsFillHandThumbsDownFill onClick={clickDisLike} className="thumb" />
      <span>{disLike}</span>
    </div>
  );
};
export default ThumbDown;
