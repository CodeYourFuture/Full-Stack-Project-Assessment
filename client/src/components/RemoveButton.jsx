import { Button } from "@material-ui/core";
import { FaTimes } from "react-icons/fa";
import "../styles/RemoveButton.css";

const RemoveButton = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      className="remove-button"
      onClick={onClick}
    >
      <FaTimes className="remove-icon" />
      <span className="remove-text">Delete</span>
    </Button>
  );
};

export default RemoveButton;
