import React, { useState } from "react";

function Form() {
    const [Title, setTitle] = useState("");
    const [Url, setUrl] = useState("");
    
    // const handleChange = event => {
    //     setTitle(event.target.value);
    //   };
  
  return (
<form>
        <input
          value={Title}
          handleChange={e => setTitle(e.target.value)}
          placeholder="Title"
          type="text"
          name="TITLE"
          required
        />
        <br />
        <input
          value={Url}
          handleChange={e => setUrl(e.target.value)}
          placeholder="url"
          type="text"
          name="URL"
          required
        />< br/>

        <button className='cancel-button' type="cancel">Cancel</button>
        <button className='add-button'type="add">Add</button>
          </form> 
  );
  }

  export default Form;