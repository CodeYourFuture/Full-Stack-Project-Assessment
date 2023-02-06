import React from "react";
import data from "../data/exampleresponse.json";
import { useState } from "react";
import Cards from "./Cards";
const Form = ({ form }) => {
  const [add, setAdd] = useState(data);
  const [newObject, setNewObject] = useState({
    title: "",
    url: "",
  });

 

  function showHandler(event) {
    event.preventDefault();
    setAdd([...add, newObject]);
     setNewObject({
        title: "",
        url: "",
      })
  }
 

  return (
    <div>
      <form
        onSubmit={showHandler}
        className="form-group"
        style={{ display: form ? "inline" : "none" }}
      >
        <label>Title</label>
        <input
          onChange={(e) =>
            setNewObject({
              ...newObject,
              title: e.target.value,
            })
          }
          name="title"
          type="text"
          placeholder="enter the title"
          required
        ></input>
        <br />
        <label>URL</label>
        <input
          onChange={(e) =>
            setNewObject({
              ...newObject,
              url: e.target.value,
            })
          }
          name="url"
          type="text"
          placeholder="enter the url"
          required
        ></input>
        <br />
        <button className="btn btn-success">ADD</button>
        <button className="btn btn-danger">Cancel</button>
      </form>
      <div className="row">
      {add.length > 0 &&
        add.map((card) => {
          return (
            <div className="col-6 col-md-4">
          <Cards key={card.id} card={card} add={add} setAdd={setAdd} />
          </div>
          )
        })}
       </div> 
    </div>
  );
};

export default Form;
