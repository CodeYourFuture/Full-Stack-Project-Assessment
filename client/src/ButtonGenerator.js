import React from "react";


const ButtonGenerator = (props) => {

  return (
    <button className="button" onClick={() => props.handleClick}>
      {props.voteType}
    </button>
  )
}

export default ButtonGenerator;