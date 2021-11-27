import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const Buttons = () => {
  return (
    <div>
      <button>
        <FontAwesomeIcon icon={faCoffee} />
      </button>
    </div>
  );
};

export default Buttons;
