import { FaTimes } from "react-icons/fa";
import "../styles/RemoveButton.css";

const RemoveButton = ({ onClick }) => {
  return (
    <div className="remove-button" onClick={onClick}>
      <FaTimes className="remove-icon" />
      <span className="remove-text">Delete</span>
    </div>
  );
};

export default RemoveButton;
