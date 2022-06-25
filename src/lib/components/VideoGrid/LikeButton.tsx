import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";

type Props = {
  type: "like" | "dislike";
  state: "pressed" | "unpressed";
};

const LikeButton = ({ type, state }: Props): JSX.Element => {
  let button: JSX.Element;
  if (type === "like") {
    if (state === "pressed") {
      button = <FaThumbsUp size="1.5rem" />;
    } else {
      button = <FaRegThumbsUp size="1.5rem" />;
    }
  } else if (state === "pressed") {
    button = <FaThumbsDown size="1.5rem" />;
  } else {
    button = <FaRegThumbsDown size="1.5rem" />;
  }
  return button;
};

export default LikeButton;
