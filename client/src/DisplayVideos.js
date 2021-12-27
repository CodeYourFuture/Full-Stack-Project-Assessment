import React, { useState , useEvent , useEffect } from "react";
import AddVideo from "./AddVideo";
import SearchVideo from "./SearchVideo";
import button from './button-bg.png';
import cityBackground from './cityBackgroundEdited.jpg';


export default function DisplayVideos(){

    const [ initialVideoData , updateVideoData ] = useState([]);
    const [ currentVideo , updateCurrentVideo ] = useState([]);
    const [ approvalCounter , updateApprovalCounter ] = useState(0);
    const [ selectedOrder , setSelectedOrder] = useState("desc"); //default value
  


    useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch('http://localhost:5000/')
        .then(response => response.json())
        .then(data => {
            updateVideoData(data);
            // orderVideos();
            updateCurrentVideo(data[0]);
            updateApprovalCounter(data[0].rating);
        })
        // .then(()=>{
        //     const defaultOrder = OrderVideos();
        //     updateVideoData(defaultOrder);
        // })
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

                if (data.rating === undefined){
                    updateApprovalCounter(0);
                } else {
                    updateApprovalCounter(data.rating);
                }
                
            });
    }
    
    function addVideoFromInput(data){
        console.log(data);
        updateVideoData(data);
    }

    // let globalApprovalID = 0;

    function likeDislikeCounter(input, id){
        let counterToPass;
        console.log(approvalCounter)
        // globalApprovalID= id;

        if (input === true) {
            counterToPass = approvalCounter+1;
            console.log(counterToPass)
            updateApprovalCounter(counterToPass);
        } else if (input === false) {
            counterToPass = approvalCounter-1;
            console.log(counterToPass)
            updateApprovalCounter(counterToPass);
        }

        console.log(approvalCounter);

        fetch(`http://localhost:5000/${id}`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            updatedRatings: approvalCounter
        })
        })
        .then(response => response.json())
        .then(data => {
           console.log(data);
        });
        

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
            ascOrDesc = event.target.value;
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
            // console.log(videosOrderedAsc)
            // updateVideoData(videosOrderedAsc);
            // console.log(initialVideoData);
        }
    }


    function handleOrderChange(event){
        setSelectedOrder(event.target.value);
        OrderVideos(event);
    }

    return (
        <div>
            <div className="App-header">
            <h1>VIDEO RECOMMENDATIONS</h1>

            <div className="headerBoxContainer">

                <div className="headerBox">
                    <h2 className="headerBoxText">SEARCH</h2>
                    <img src={button} alt="button background"></img>
                    {/* <SearchVideo/> */}
                </div>
                
                <div className="headerBox">
                    <h2 className="headerBoxText">ADD VIDEO</h2>
                    <img src={button} alt="button background"></img>
                    {/* <AddVideo passBackParam={(data)=>addVideoFromInput(data)}/> */}
                </div>
                
                <div className="headerBox">
                    <h2 className="headerBoxText">VIDEO ORDER</h2>
                    <img src={button} alt="button background"></img>
                    {/* <label for="ratings">Video Order</label>
                    <select name="ratings" id="ratings" value={selectedOrder} onChange={handleOrderChange}>
                        <option value="desc">Ascending</option>
                        <option value="asc">Descending</option>
                    </select> */}
                </div>
                
            </div>
            </div>

            

            <div className="outerVideoContainer">

                
                <div className="currentVideoContainer">

                    
                  <h2>{currentVideo.title}</h2>
                  <iframe width="560" height="315" src={`https://www.youtube.com/embed/${currentVideo.thumbnail}?modestbranding=1`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  <button type="button" onClick={()=>{likeDislikeCounter(true, currentVideo.id)}}>Like</button>
                  <button type="button" onClick={()=>{likeDislikeCounter(false, currentVideo.id)}}>Dislike</button>
                  <h3>Num of votes : {approvalCounter}</h3>
                  <button type="button" onClick={()=>{deleteVideo(currentVideo.id)}}>Remove video</button>
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