import {React, useState} from 'react';
import "../App.css";
import Data from '../Data.json';
import AddVideo from './addVideo';
import Search from './search.js';
import VideoFrames from './videoFrames.js';



const AllVideoFiles = () => {
    const [allVideos, setAllVideos] = useState(Data);   

    const handleDelete = (event) => {        
        const videoTitle = event.currentTarget.parentNode.childNodes[0].textContent;
        const videoToDelete = allVideos.filter((obj) => {
            if(!(obj["title"] === videoTitle)){
            return obj;
            }
        })
        setAllVideos(videoToDelete);
    }
    const handleSearch = (event) => {
        const searchedVideo = event.target.value.toLowerCase();
        console.log(searchedVideo);
        const selectedVideo = [];
         allVideos.filter((obj) => {
            if(obj["title"].toLowerCase().includes(searchedVideo)){
                selectedVideo.push(obj)
            }
        })
         setAllVideos(selectedVideo);
    }

    const handleAddVideo = (event) => {
        const videoAdd = event.currentTarget.parentNode.childNodes[0].childNodes[1].childNodes[0].childNodes[1];
        const videoToAdd = event.target.textContent;
        console.log(videoAdd)
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
           const url = event.currentTarget.parentNode.childNodes[0].childNodes[1].childNodes[0].childNodes[3].value;
        
        const newVideoToAdd = {
            "title": {title},
            "url": {url},
            "rating": 0
        }
        console.log(newVideoToAdd);
        allVideos.push(newVideoToAdd);
        console.log(allVideos);
    }
    setAllVideos(allVideos);
    }

        
return (
    <div>
        <div className = "addVideoSearch">
            <AddVideo handleAddVideo ={handleAddVideo}/>
            <Search handleSearch = {handleSearch} />
        </div>
        <VideoFrames Data = {allVideos} handleDelete = {handleDelete} />
    
    </div>
)
}


export default AllVideoFiles;