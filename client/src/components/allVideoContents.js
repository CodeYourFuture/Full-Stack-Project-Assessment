import React, { useState, useEffect, useRef} from 'react';
import "../App.css";
import AddVideo from './addVideo';
import Search from './search.js';
import SortButton from './sortButton';
import VideoFrames from './videoFrames.js';



const AllVideoFiles = () => {
    const allVideos = useRef([]);
    const [displayVideos, setDisplayVideos] = useState([]);
    const [sortVideoButton, setSortVideoButton] = useState("Ascending");

    useEffect(() => {
        fetch("http://127.0.0.1:5000/")
          .then(response => response.json())
          .then(data => {
            allVideos.current = data;
            setDisplayVideos(data);
        }).catch(error => alert("Refresh The page, something went wrong"));
        }, [])

    const handleSearch = (event) => {
        const searchedVideo = event.target.value.toLowerCase();
        const selectedVideo = allVideos.current.filter((obj) => {
            return (obj["title"].toLowerCase().includes(searchedVideo))
        })
         setDisplayVideos(selectedVideo);
    }

    const handleSort = (event) => {
        const buttonSort = event.target.textContent;
        if(buttonSort === "Descending"){
            setSortVideoButton("Ascending")
            setDisplayVideos([...displayVideos].sort( (a, b) => a.rating > b.rating? -1 : 1))
        } else {
            setSortVideoButton("Descending")
            setDisplayVideos([...displayVideos].sort( (a, b) => a.rating > b.rating? 1 : -1))
        }
    }

    return  (
    <div>
        <div className = "addVideoSearch">
            <AddVideo setDisplayVideos = {setDisplayVideos} allVideos = {allVideos.current}/>
            <Search handleSearch = {handleSearch} />
            <SortButton  sortVideoButton = {sortVideoButton} handleSort = {handleSort}/>
        </div>
        <VideoFrames Data = {displayVideos} setDisplayVideos = {setDisplayVideos} allVideos = {allVideos.current} />
    
    </div>
)
}


export default AllVideoFiles;