import React from "react";
import "../../App.css";

function Input ({value, label, placeholderText, onChange}) {

return (
      <div className="form-group mb-2">
        <label forhtml="videoTitle" className="sr-only">
          {label}
        </label>
        <input
          value={value}
          type="text"
          className="form-control"
          id="videoTitle"
          onChange={onChange}
          placeholder={placeholderText}
        />
      </div>
    );
}

export default Input