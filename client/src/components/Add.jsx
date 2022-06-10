import React, { useState } from "react";

const Add = ({ allData , handleSet}) => {
  const [toggle, setToggle] = useState(false);
  const handleAdd = () => {
    setToggle(!toggle);
  };
  const handleSubmit = (submitEvent) => {
      submitEvent.preventDefault();
    const newId = Math.max(...allData.map((video) => video.id)) + 1;
    
    const newVideo = {
      id: newId,
      title: submitEvent.target.title.value,
      url: submitEvent.target.url.value,
      rating: 0,
    };
    
    handleSet(newVideo);

  };
  return (
    <div>
      <button onClick={handleAdd}>ADD</button>
      <div className={toggle ? "display-block" : "display-none"}>
        <form onSubmit={handleSubmit} action="">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" />
          <label htmlFor="url">URL</label>
          <input type="text" id="url" />
          <button type="submit">SAVE</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
