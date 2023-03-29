import React, {useState, useEffect} from "react";
const fetch = window.fetch;

const Vote = ({count, videoId}) =>{

    const [add, setAdd] = useState(count);
    const [minus, setMinus] = useState(count);

    const handleAdd = () => {
        setAdd(prevLikes => prevLikes + 1);
        fetch(`/videos/${videoId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({rating: add + 1 })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
    };

    const handleMinus = () => {
        setMinus(prevLikes => prevLikes - 1);
        fetch(`/videos/${videoId}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({rating: minus - 1 })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
    };

    useEffect(() => {
        fetch('http://localhost:5000/')
        setAdd(count);
        setMinus(count);
      },[count]);
       
return(
    <div>
        <button onClick={handleAdd}>Vote Up</button>
        <p>This video has {add + minus} likes</p>
        <button onClick={handleMinus} >Vote Down</button>
    </div>
);  

}


export default Vote;