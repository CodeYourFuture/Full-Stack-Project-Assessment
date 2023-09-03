//import React from 'react';
import React, { useState } from 'react';
//import 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css';
//import "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js";
//import "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js";

import "./App.css";
import uploadedVideoData from "./data/uploadedVideoData.json";

 
const dataVideo = uploadedVideoData.sort((a,b)=>b.rating-a.rating);
//console.log(dataVideo)
function VideoComponent({ elements }){
    return (
        <div class= "container">
        <div class="videoDisplayContainer" >{
            elements.map((element,index)=>(
                <VideoDisplay key={index} element={element} />))
            
        }</div></div>
    );
}
function VideoDisplay({ element }){
    const [score, setScore] = useState(element.rating);
    //const [scoredislike,setScoredislike] = useState(0);
    // function increment() {
    //     setScore(s => s + 1);
    //   }
    // function decrement() {
    //     setScore(s => s - 1)
    // }
    
    
    
    return (
    
       <div class="displayGrid"><h5>{element.title}</h5>
      
      <iframe width="330" height="200"
src={element.url} title={element.title}border="none" border-radius="103px"frameborder='0'allowfullscreen align="center">
</iframe>
<div class="likedislikeBtn">
   <a href="#0" class="btn btn-info btn-lg"  onClick = {() => setScore(s => s + 1)} >
          <span class="glyphicon glyphicon-thumbs-up"></span> Like
        </a>
        <p>Votes:&nbsp;{score}</p>
         {/* <p>Votes:&nbsp;{scoredislike}</p> */}
        <a href="#0" class="btn btn-info btn-lg">
          <span class="glyphicon glyphicon-thumbs-down"  onClick = {() => setScore(s => s-1)}></span>Dislike
        </a></div>
      <button class="deleteBtn">Delete</button></div>)}
    
export default function AllVideoDisplay(){
    
    return(
        <VideoComponent elements={dataVideo}/>
    )
}