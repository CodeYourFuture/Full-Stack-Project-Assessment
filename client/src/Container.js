import React, { useState , useEffect} from "react";
import VideoSection from "./VideoSection";
import VideoContainer from "./VideoContainer";


const Container = () => {
    const [videos, setVideos] = useState([]);
    const myLink = "https://full-stack-project-assessment-server-1p0c.onrender.com";

    useEffect(() => {
    fetch(myLink)
    .then((response) => response.json())
    .then((data) => {
    setVideos([...data])
    }).catch((error) => console.log(error));
    }, []);
  

  const handleRemove = (id) => {
    fetch(`${myLink}${id}`,{method:"DELETE"})
    .then(() => {
        fetch(myLink)
    .then((response) => response.json())
    .then((data) => {
      setVideos([...data])
    })
   }).catch((error) => console.log(error));
  };

 
  const handleAddVideo = (video) => {
    fetch(myLink, {
    method:"POST" ,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(video)
    })
    .then(() => {
        fetch(myLink)
    .then((response) => response.json())
    .then((data) => {
      setVideos([...data])
    });
   }).catch((error) => console.log(error));

  };

  const handleUpVote = (video) => {
    video.rating = video.rating+1;
    fetch(`${myLink}${video.id}`,{
    method:"PUT" ,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({video})
    })
    .then(() => {
        fetch(myLink)
    .then((response) => response.json())
    .then((data) => {
      setVideos([...data])
    })
   }).catch((error) => console.log(error));

  };

  const handleDownVote = (video) => {
    video.rating = video.rating-1;
    fetch(`${myLink}${video.id}`,{
    method:"PUT" ,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({video})
    })
    .then(() => {
        fetch(myLink)
    .then((response) => response.json())
    .then((data) => {
      setVideos([...data])
    })
   }).catch((error) => console.log(error));

  };


  return (
    <div>
      <VideoContainer handleAddVideo={handleAddVideo} />
      <VideoSection
        videos={videos}
        upVote={handleUpVote}
        downVote={handleDownVote}
        removeVideo={handleRemove}
      />
    </div>
  );
};

export default Container;