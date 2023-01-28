import React, { useState } from "react";
import AddNewVideo from "../Components/AddNewVideo";

const AddVideoBtn = ({ addNewVideoFunction }) => {
  const [showForm, setShowForm] = useState(true);
  const handleClick = () => {
    setShowForm(!showForm);
  };
  return (
    <div>
      <button onClick={handleClick} className="btn btn-primary">
        Add a Video
      </button>

      {showForm ? <AddNewVideo addNewVideo={addNewVideoFunction} /> : <> </>}
    </div>
  );
};

export default AddVideoBtn;
