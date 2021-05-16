import React from "react";
const Votes = (props) => {
  return (
    <div className="Vote">
      <button className="thumbs-up">
        <i className="fa fa-thumbs-up"></i>
      </button>
      <button className="thumbs-down">
        <i className="fa fa-thumbs-down"></i>
      </button>
    </div>
  );
};
export default Votes;
