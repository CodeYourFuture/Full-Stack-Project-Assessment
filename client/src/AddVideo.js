import React, { useState , useEvent , useEffect } from "react";
import DisplayVideos from "./DisplayVideos";

export default function AddVideo(props){

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
      console.log(event.target.title);

      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
      // console.log(inputs);
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

      if ((inputs.title === undefined) || (inputs.url === undefined)){
        alert("Please ensure both Title and Url input boxes are populated");
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
        <div className="addVideoBar">
            <form onSubmit={handleSubmit} >
                <input name="title" value={inputs.title || ""} type="text" placeholder="Title.." onChange={handleChange}/>
                <input name="url" value={inputs.url || ""} type="text" placeholder="Url.." onChange={handleChange}/>
                <input type="submit" />	
            </form>
        </div>
    )
}
