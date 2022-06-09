import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = () => {
    const [addVote, setAddVote] = useState(0);


    function plus(e) {
        setAddVote(addVote + 1);
      }
    
      function minus(e) {
        setAddVote(addVote - 1);
      }



    return (
        <div>
              <div className="counter">
                <button
                  className="button is-info is-light"
                  onClick={(e) => minus(e)}
                >
                  <FontAwesomeIcon icon="fa-solid fa-thumbs-down" />
                </button>
                <div className="counter--count">
                  <span>{addVote}</span>
                </div>
                <button
                  className="button is-info is-outlined"
                  onClick={(e) => plus(e)}
                >
                  <FontAwesomeIcon icon="fa-solid fa-thumbs-up" />
                </button>
              </div>



        </div>
    )

} 









export default Button;