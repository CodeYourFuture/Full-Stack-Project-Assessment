import React, { useState, useEffect, useRef} from 'react';
import "../App.css";
// import Data from '../Data.json';
import AddVideo from './addVideo';
import Search from './search.js';
import SortButton from './sortButton';
import VideoFrames from './videoFrames.js';



const AllVideoFiles = () => {
    const allVideos = useRef([]); 
    // const allVideosCurrent =allVideos.current;
    const [displayVideos, setDisplayVideos] = useState([]);
    const [sortVideoButton, setSortVideoButton] = useState("Ascending");

    useEffect(() => {
        fetch("http://127.0.0.1:5000")
          .then(response => response.json())
          .then(data => {
            allVideos.current = data;
            setDisplayVideos(data);
        }).catch(error => alert("Refresh The page, something went wrong"));
        }, [])

    const handleDelete = (event) => {        
        const videoTitle = event.currentTarget.parentNode.parentNode.childNodes[0].textContent;
        // const videoTitle = event.currentTarget.parentNode.childNodes[0].textContent;
        // console.log(videoTitle);
        const videosRemaining = allVideos.current.filter((obj) => {
            if((obj["title"] !== videoTitle)){
            return obj;
            }
        })
        allVideos.current = videosRemaining;
        setDisplayVideos(videosRemaining);
    }
    const handleSearch = (event) => {
        const searchedVideo = event.target.value.toLowerCase();
        const selectedVideo = allVideos.current.filter((obj) => {
            return (obj["title"].toLowerCase().includes(searchedVideo))
        })
         setDisplayVideos(selectedVideo);
    }

    const handleSort = (event) => {
        // const videoSort = [...searchedVideos]
        const buttonSort = event.target.textContent;
        if(buttonSort === "Descending"){
            setSortVideoButton("Ascending")
            // videoSort.sort( (a, b) => a.rating > b.rating? 1 : -1)
            // console.log(videoSort)
            setDisplayVideos([...displayVideos].sort( (a, b) => a.rating > b.rating? -1 : 1))
        } else {
            setSortVideoButton("Descending")
            // videoSort.sort( (a, b) => a.rating > b.rating? 1 : -1)
            // console.log(videoSort)
            setDisplayVideos([...displayVideos].sort( (a, b) => a.rating > b.rating? 1 : -1))
        }
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
        setDisplayVideos(allVideos.current)    
    } else {
            alert("Enter a valid title or URL")
        }
    }    
    }

    // function sortAllVideosAsc(allVideos) {
    //     allVideos.sort((a, b) => {
    //       return (a.rating - b.rating) 
    //   })
    // }

    // function sortAllVideosDesc(allVideos) {
    //     allVideos.sort((a, b) => {
    //       return (b.rating - a.rating) 
    //   })
    // }

    return  (
    <div>
        <div className = "addVideoSearch">
            <AddVideo handleAddVideo ={handleAddVideo}/>
            <Search handleSearch = {handleSearch} />
            <SortButton  sortVideoButton = {sortVideoButton} handleSort = {handleSort}/>
        </div>
        <VideoFrames Data = {displayVideos} handleDelete = {handleDelete} />
    
    </div>
)
}


export default AllVideoFiles;