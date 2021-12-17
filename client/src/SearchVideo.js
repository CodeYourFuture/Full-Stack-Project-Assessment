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
      // The prevent default ensures that this only runs once. I have then done a push
      // request to the server, which then returns the updated list of videos. This is 
      // then passed as a prop back to the DisplayVideo component which then updates the 
      // useState in the setWord function ... Only able to pass this data with using
      // stringify . Also needed to take the response from the server and then process
      // it into data using another .then 
      
      event.preventDefault(); 
      console.log(inputs)

      if (inputs.search === undefined){
        alert("Please ensure the search input box is populated");
      } else {
        fetch('http://localhost:5000/', {
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
        <div>
          <form onSubmit={handleSubmit} >
                <input name="search" value={inputs.search || ""} type="text" placeholder="Title.." onChange={handleChange}/>
                <input value="search" type="submit" />	
            </form>
        </div>
    )
};