import React from "react";

const AddVid = ({
  handleVideoUrlChange,
  handleVideoTitleChange,
  addNewVidSubmit,
  showVideoForm,
  setShowVideoForm,
}) => {
  const handleClick = () => {
    setShowVideoForm(!showVideoForm);
  };
  return (
    <div className="addVid">
      <p className="text-primary" onClick={handleClick}>
        Add video
      </p>

      {showVideoForm && (
        <form onSubmit={addNewVidSubmit}>
          <label>
            Title
            <input
              type="text"
              name="title"
              placeholder="Add a video title"
              onChange={handleVideoTitleChange}
            />
          </label>
          <br />
          <br />
          <label>
            URL
            <input
              type="text"
              name="url"
              placeholder="Add the video URL"
              onChange={handleVideoUrlChange}
            />
          </label>
          <br />
          <input
            type="reset"
            className="btn btn-warning m-2"
            value="Cancel"
            onClick={handleClick}
          />
          <input type="submit" className="btn btn-danger m-2" value="ADD" />
        </form>
      )}
    </div>
  );
};

export default AddVid;
