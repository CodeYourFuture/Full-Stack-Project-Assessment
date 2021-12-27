import React, { useState , useEvent , useEffect } from "react";

export default function SearchVideo(props){
    
    const [inputs, setInputs] = useState({});
    
    const handleChange = (event) => {
      console.log(event.target.value);

      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
      
      event.preventDefault(); 
      console.log(inputs)

      if (inputs.search === undefined){
        alert("Please ensure the search input box is populated");
      } else {
        fetch('http://localhost:5000/videos/', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: inputs.title,
            url : inputs.url
        })
        })
        .then(response => response.json())
        .then(data => {
           console.log(data);
           props.passBackParam(data) 
        });
      }
    }

    return (
        <div className="searchContainer">
          <form onSubmit={handleSubmit} >
                <input name="search" value={inputs.search || ""} type="text" placeholder="Title.." onChange={handleChange}/>
                <input value="search" type="submit" />	
            </form>
        </div>
    )
};