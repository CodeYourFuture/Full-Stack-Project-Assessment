import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
} from 'react-icons/fa'

type Props = {
  type: 'like' | 'dislike'
  state: 'pressed' | 'unpressed'
}

const LikeButton = ({ type, state }: Props):JSX.Element => {
  let button:JSX.Element;
  if (type === 'like') {
    if (state === 'pressed') {
      button = <FaThumbsUp />
    } else {
      button = <FaRegThumbsUp />
    }
  } else if (state === 'pressed') {
    button = <FaThumbsDown />
  } else {
    button = <FaRegThumbsDown />
  }
  return button
}

export default LikeButton
