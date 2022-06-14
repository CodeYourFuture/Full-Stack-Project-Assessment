import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const UpVoteButton = (props) => {
  const { counter, setCounter } = props;
  const onClickHandler = () => {
    setCounter(() => {
      return counter + 1;
    });
  };
  return (
    <button className="vote-button" onClick={onClickHandler}>
      <FontAwesomeIcon
        className="icon"
        icon={faHeart}
        size="2x"
        alt="like video"
      />
    </button>
  );
};
export default UpVoteButton;
