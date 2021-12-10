import React from "react";

const AddVideoBtn = ({ addVideoForm, setAddVideoForm }) => {
  const handleClick = () => {
    setAddVideoForm(!addVideoForm);
  };
  return <button onClick={handleClick}>Type..</button>;
};

export default AddVideoBtn;
