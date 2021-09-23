import React from "react";

const AddVideo = () => {
  return (
    <div>
      <h4>Add Video</h4>
      <form>
        <div>
          <label>
            Title
            <input className="input" name="title" type="text" required />
          </label>
        </div>
        <div>
          <label>
            URL
            <input className="input" name="url" type="text" required />
          </label>
        </div>
        <div>
          <button className="btn btn-warning input" type="cancel">
            Cancel
          </button>

          <button className="btn btn-danger input" type="submit">
            ADD
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVideo;
