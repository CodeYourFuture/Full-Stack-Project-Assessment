import React from "react";

const AddVid = () => {
  return (
    <div className ="addVid">
      <p className="text-primary">Add video</p>
      <form>
        <label>
          Title
          <input type="text" name="title" />
        </label>
        <br />
        <br />
        <label>
          URL
          <input type="text" name="url" />
        </label>
        <br />
        <input type="button" className="btn btn-warning m-2" value="Cancel" />
        <input type="submit" className="btn btn-danger m-2" value="ADD" />
      </form>
    </div>
  );
};

export default AddVid;
