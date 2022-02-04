import React, {useEffect, useState} from "react";
//import Retrieve from "./fetch.js";

function Retrieve() {
    const[videosData, setVideosData] = useState([]);
    useEffect(() => {
        fetch('/')
        .then(res => {
            if(res.ok){
                res.json();
            }
        }).then(jsonResponse => setVideosData(jsonResponse))
    },[])
    console.log(videosData);
}

export default Retrieve;