import React from "react";

const AddVideo = () => {
    return (
      <div>
        <h4>Add video</h4>
        <label htmlFor="addTitle">
          {' '}
          Title
          <input type="text" />
        </label>
        <br />
        <label htmlFor="addUrl">
          {' '}
          URL
          <input type="text" />
        </label><br/>
        <button>Add</button>
        <button>Cancel</button>
      </div>
    );
}

export default AddVideo