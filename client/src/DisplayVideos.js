import React, { useState , useEvent , useEffect } from "react";
import AddVideo from "./AddVideo";
import SearchVideo from "./SearchVideo";
import button from './resources/button-bg.png';
import cityBackground from './resources/cityBackgroundEdited.jpg';
import SearchTornAnimation from "./SearchTornAnimation";
import AddVideoTornAnimation from "./AddVideoTornAnimation";
import VideoOrderTornAnimation from "./VideoOrderTornAnimation";
import ApprovalCounterFunction from "./ApprovalCounterFunction";


export default function DisplayVideos(){

    const [ initialVideoData , updateVideoData ] = useState([]);
    const [ currentVideo , updateCurrentVideo ] = useState([]);
    const [ selectedOrder , setSelectedOrder] = useState("desc"); //default value
    

    useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch('http://localhost:5000/')
        .then(response => response.json())
        .then(data => {
            updateVideoData(data);
            // orderVideos();
            updateCurrentVideo(data[0]);
        })
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    // This goes through the data fetched from the API and adds the thumbnail code to each object
    initialVideoData.forEach(element => {
        addThumbnailToElement(element);
    });

    // This thumbnail code is also used for the src for the video currently being displayed
    function addThumbnailToElement(elem){
        // console.log(elem.url);
        const vidUrl = elem.url;
        const startSplit = vidUrl.indexOf("v=");
        const thumbnailCode = vidUrl.slice(startSplit + 2);
        elem.thumbnail = thumbnailCode;
        return elem;
    }

    function switchVideoFromClick(id){
        console.log(id)
        // Here I need to do a fetch request to my API for the get request with an ID. Then display the data returned and update the useState
        fetch(`http://localhost:5000/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                addThumbnailToElement(data);
                updateCurrentVideo(data);
            });
    }
    
    function addVideoFromInput(data){
        console.log(data);
        if (data !=undefined){
            updateVideoData(data);
        }

    }


    function deleteVideo(id){
        console.log(id);
        fetch(`http://localhost:5000/${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                updateVideoData(data);
                updateCurrentVideo(data[0]);
            });
    }

    
    function OrderVideos(event){
        
        let ascOrDesc;

        if (event === undefined){
            ascOrDesc = "desc";
        } else {
            ascOrDesc = event;
        }
        
        console.log(ascOrDesc);
        
        if (ascOrDesc === "desc"){

            let videosOrderedDesc = initialVideoData.sort(function(a, b) { 
                return a.rating - b.rating;
            })
            // updateVideoData(videosOrderedDesc);
            console.log("descending")
            return videosOrderedDesc
            // console.log(initialVideoData);

        } else {
            let videosOrderedAsc = initialVideoData.sort(function(a, b) { 
                return b.rating - a.rating;
            })
            console.log("ascending")
            return videosOrderedAsc;
        }
    }


    function handleOrderChange(event){
        console.log(event);
        setSelectedOrder(event);
        OrderVideos(event);
    }

    return (
        <div>
            <div className="headerContainer">

                <h1 className="headerTitleText">VIDEO RECOMMENDATIONS</h1>
                
                <div className="bannerContainer">

                        <SearchTornAnimation/>
                    
                        <AddVideoTornAnimation passBackParam={(data)=>addVideoFromInput(data)}/>
           
                        <VideoOrderTornAnimation passBackParam={(data)=>handleOrderChange(data)}/>
        
                </div>

            </div>

            

            <div className="outerVideoContainer">

                <div className="innerVideoContainer">
                    <div className="currentVideoContainer">
                        <h2>{currentVideo.title}</h2>
                        <iframe  id="currentVideoFrame"  src={`https://www.youtube.com/embed/${currentVideo.thumbnail}?modestbranding=1`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        <div className="alternativeApprovalBanner">
                             <ApprovalCounterFunction passedRating={currentVideo.rating} passedId={currentVideo.id}/>
                            <button href="#" class="hbtn hb-border-top-br3 removeButton" type="button" onClick={()=>{deleteVideo(currentVideo.id)}}><span className="removeIcon"><ion-icon name="close"></ion-icon></span><span className="removeText">DELETE</span></button>
                        </div>
                       
                    </div> 
                </div>



                <div className="thumbnailContainer">
                    {initialVideoData.map(function(element){
                    return(
                        <div className="thumbnailElement">
                            <img src={`http://img.youtube.com/vi/${element.thumbnail}/0.jpg`} className="thumbnailImage" draggable="false" alt="placeholder" 
                            onClick={anon=>switchVideoFromClick(element.id)}></img>
                            <h3 className="thumbnailText">{element.title}</h3>
                        </div>
                    )
                    })}
                </div>
            </div>
        </div>
    )
}