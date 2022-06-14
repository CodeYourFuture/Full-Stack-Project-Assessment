import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";

const DownVoteButton = (props) => {
  const { counter, setCounter } = props;
  const handleClick = () => {
    setCounter(() => {
      return counter - 1;
    });
  };
  return (
    <button
      className="vote-button"
      aria-label="dislike video"
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={faHeartBroken} size="2x" />
    </button>
  );
};
export default DownVoteButton;
