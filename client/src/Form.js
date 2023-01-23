import React from "react";
import "./App.css";

const Form = () =>{
    
    return (
      <div>
        <form className="Form">
            <span>Add video</span>
          <label>
            Title:
            <input type="text" />
          </label>
          <label>URL
            <input type="text" />
          </label>
          <button>Cancel</button>
          <button>Add</button>
        </form>
      </div>
    );
}

export default Form;