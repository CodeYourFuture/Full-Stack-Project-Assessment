import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const DescButton = (props) => {
  const { setData } = props;

  const changeOrder = async () => {
    const response = await fetch(
      "https://full-stack-project-videos.herokuapp.com/?order=desc"
    );
    const data = await response.json();
    setData(data);
  };
  const onClickHandler = async () => {
    await changeOrder();
  };
  return (
    <button className="toggle-order-button" onClick={onClickHandler}>
      likes <FontAwesomeIcon icon={faArrowDown} />
    </button>
  );
};
export default DescButton;
