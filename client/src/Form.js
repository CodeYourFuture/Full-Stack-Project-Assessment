import React from "react";

const Form = () =>{
    
    return (
      <div>
        <form>
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