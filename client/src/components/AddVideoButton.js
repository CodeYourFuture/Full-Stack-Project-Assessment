import React from "react";

const AddVideoButton = ({
  showAddVideoForm,
  setShowAddVideoForm,
  movieApi,
}) => {
  const handleClick = () => {
    setShowAddVideoForm(!showAddVideoForm);
    movieApi();
  };
  return <button onClick={handleClick}>+</button>;
};

export default AddVideoButton;
