import React from "react";

const AddVideoButton = ({ showAddVideoForm, setShowAddVideoForm }) => {
  const handleClick = () => {
    setShowAddVideoForm(!showAddVideoForm);
  };
  return <button onClick={handleClick}>+</button>;
};

export default AddVideoButton;
