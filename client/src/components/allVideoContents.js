import React, { useState, useEffect, useRef} from 'react';
import "../App.css";
// import Data from '../Data.json';
import AddVideo from './addVideo';
import Search from './search.js';
import VideoFrames from './videoFrames.js';



const AllVideoFiles = () => {
    const allVideos = useRef([]); 
    // const allVideosCurrent =allVideos.current;
    const [searchedVideos, setSearchedVideos] = useState([]);
    
    useEffect(() => {
        fetch("http://127.0.0.1:5000")
          .then(response => response.json())
          .then(data => {
            allVideos.current = data;
            setSearchedVideos(data);
        }).catch(error => alert("Refresh The page, something went wrong"));
        }, [])

    const handleDelete = (event) => {        
        const videoTitle = event.currentTarget.parentNode.childNodes[0].textContent;
        const videosRemaining = allVideos.current.filter((obj) => {
            if((obj["title"] !== videoTitle)){
            return obj;
            }
        })
        allVideos.current = videosRemaining;
        setSearchedVideos(videosRemaining);
    }
    const handleSearch = (event) => {
        const searchedVideo = event.target.value.toLowerCase();
        const selectedVideo = allVideos.current.filter((obj) => {
            return (obj["title"].toLowerCase().includes(searchedVideo))
        })
         setSearchedVideos(selectedVideo);
    }

    const handleAddVideo = (event) => {
        // const videoAdd = event.currentTarget.parentNode.childNodes[0].childNodes[1].childNodes[0].childNodes[1];
        const videoToAdd = event.target.textContent;
        if(videoToAdd === "Add Video") {
            if (event.currentTarget.childNodes[1].classList.contains("displayclass")){
                event.currentTarget.childNodes[1].classList.remove("displayclass")
            } else {
                event.currentTarget.childNodes[1].classList.add("displayclass")
            }
        } else if ( videoToAdd === "Cancel") {
            event.currentTarget.childNodes[1].classList.add("displayclass")
        } else if (videoToAdd === "ADD") {
           const title = event.currentTarget.parentNode.childNodes[0].childNodes[1].childNodes[0].childNodes[1].value;
           event.currentTarget.parentNode.childNodes[0].childNodes[1].childNodes[0].childNodes[1].value = "";
           const url = event.currentTarget.parentNode.childNodes[0].childNodes[1].childNodes[0].childNodes[3].value;
           event.currentTarget.parentNode.childNodes[0].childNodes[1].childNodes[0].childNodes[3].value = ""
           const urlValidation = /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9_-]+)/;
           const videoList = []
           const newVideoToAdd = {
                 title,
                "rating": 0,
                 url
                
        } 
        if (!(title.toString().trim().length === 0) && (url.match(urlValidation))){
        videoList.push(newVideoToAdd);
        allVideos.current = [...allVideos.current, ...videoList]
        setSearchedVideos(allVideos.current)    
    } else {
            alert("Enter a valid title or URL")
        }
    }
    
    }

    return  (
    <div>
        <div className = "addVideoSearch">
            <AddVideo handleAddVideo ={handleAddVideo}/>
            <Search handleSearch = {handleSearch} />
        </div>
        <VideoFrames Data = {searchedVideos} handleDelete = {handleDelete} />
    
    </div>
)
}


export default AllVideoFiles;