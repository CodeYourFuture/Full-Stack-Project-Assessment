import React from "react";
import SearchBar from "./SearchBar";
import VideoCards from "./VideoCards";
import videoDates from '../data/data.json'
import '../styles/home.scss';

const Home = () => {

  
   return (
       <div className="" id="home">
         <SearchBar/>
          <VideoCards videoDates={videoDates}/>
       </div>
   );
 };
 
 export default Home;
 