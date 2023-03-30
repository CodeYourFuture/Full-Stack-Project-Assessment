import React, {useState, useEffect} from "react";
const fetch = window.fetch;

const Vote = ({count, videoId}) =>{
    const [likes, setLikes] = useState(count);

    const updateRating = (rating) => {
        fetch(`/videos/${videoId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({rating, id: videoId}),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
    };

    const handleAdd = () => {
        const updateLikes = likes + 1;
        setLikes(updateLikes);
        updateRating(updateLikes);        
    };

    const handleMinus = ()=> {
        const updateLikes = likes + 1;
        setLikes(updateLikes);
        updateRating(updateLikes);   
    };

    useEffect(() => {
        setLikes(count);
      },[count]);    
       
    return(
        <div>
            <button onClick={handleAdd}>Vote Up</button>
            <p>This video has {likes} likes</p>
            <button onClick={handleMinus} >Vote Down</button>
        </div>
    );  
};


export default Vote;