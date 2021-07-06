import React, {useState} from "react";
import Boxes from "./Boxes";

var data = require('./exampleresponse.json'); 
let id = 10000;
// Currently form adds data to end of data array but doesnt add a box. I think useEffect can be used to add a new box every time the array is updated

const Form = () => {

const [array,setArray] =useState(data);
  const [input, setInput] = useState("");

  function handleInput(event) {
    setInput(event.target.value);
  }


  function handleSubmit(event) {
    console.log({ input });
    event.preventDefault();
    setArray(array.concat({ title: "test", rating: 11, id: id, url: input }))
    id++;
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

      <Boxes data={array} />
    </div>
  );
};
export default Form;