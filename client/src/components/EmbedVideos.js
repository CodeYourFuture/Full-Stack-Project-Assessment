import React, { useState } from "react";
import NewVideos from "./NewVideos";
//import ReactPlayer from "react-player";

const EmbedVideos = ( { ilk }) => {
  // const [theVideos, settheVideos] = useState("");

  // const [vote, setVote] = useState("https://www.youtube.com/watch?v=PGlnnr22qj0");

  const [allVote, setAllVote] = useState(0);
  const [allVoteDislike, setAllVoteDislike] = useState(0);
  
  const handleButton = () => {
    console.log(setAllVote);
    setAllVote(allVote + 1);
  };
  const buttonDislike = () => {
    console.log(setAllVoteDislike);
    setAllVoteDislike(allVote + 1);
  };
  // const submitform = (e) => {
  //  e.preventDefault();
  //  setVote(theVideos);
  // }
  // const onchangevideo = (e) => {
  //   settheVideos(e.target.value);
  // }
  return (
    <div>
     {/* <form onSubmit={submitform}>  
    <input type="tetx" onChange={onchangevideo} placeholder="upload video"/> 
    <button  type="button" className="btn btn-danger">upload</button>
 </form>
      <ReactPlayer controls   url={vote} width="480px" height="240px" /> */}

      <p>2345 " 45</p>
      <h2>learn sql fro biggener</h2>
      <button onClick={handleButton}   id="clickButton"  className="btn btn-primary">like {<i class="fas fa-thumbs-up"></i>} : {allVote}</button><br/>

       <iframe
        width="480"
        height="315"
        src="https://www.youtube.com/embed/T8mqZZ0r-RA"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        ></iframe> 
        <br/>
        <button onClick={buttonDislike}   id="clickButton"  className="btn btn-danger">dislike  {<i class="fas fa-thumbs-up"></i>} : {allVoteDislike}</button><br/><br/>
         <div>
           <NewVideos />
           </div>

    </div>
  );

};
export default EmbedVideos;
