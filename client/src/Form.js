import React, {useState, useEffect} from "react";
import Boxes from "./Boxes";

var data = require('./exampleresponse.json'); 

// Currently form adds data to end of data array but doesnt add a box. I think useEffect can be used to add a new box every time the array is updated

const Form = () => {


  const [input, setInput] = useState("");

  function handleInput(event) {
    setInput(event.target.value);
  }


  function handleSubmit(event) {
    console.log({ input });
    event.preventDefault();
    data.push({ title: "test", rating: 11, id: 999999, url: input });
    console.log(data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="url">Add a Video</label>
        <div className="search-row">
          <input
            value={input}
            onChange={handleInput}
            type="text"
            id="customerName"
            className="form-control"
            placeholder="Enter URL"
          />
          <button>Add</button>
        </div>
      </form>

      <Boxes data={data} />
    </div>
  );
};
export default Form;