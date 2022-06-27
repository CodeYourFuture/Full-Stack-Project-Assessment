import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const AscButton = (props) => {
  const { setData } = props;

  const changeOrder = async () => {
    const response = await fetch(
      "https://full-stack-project-videos.herokuapp.com/?order=asc"
    );
    const data = await response.json();
    setData(data);
  };
  const onClickHandler = async () => {
    await changeOrder();
  };
  return (
    <button className="toggle-order-button" onClick={onClickHandler}>
      likes <FontAwesomeIcon icon={faArrowUp} />
    </button>
  );
};
export default AscButton;
