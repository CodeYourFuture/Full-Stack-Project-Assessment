import React, {useState,useEffect} from "react";
import SearchBar from "./SearchBar";
import VideoCards from "./VideoCards";
import videoDates from '../data/data.json'
import '../styles/home.scss';

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchByCategories, setSearchByCategories] = useState("");
  const [filteredVideos, setFilteredVideos]=useState([])
 

  useEffect(() => {
    const search = () => {
      let filteredVideos = videoDates.filter((video) => {
        console.log(searchByCategories.toLowerCase())
        return ( video.title.toLowerCase().includes(searchInput.toLowerCase())||
                video.categories.includes(searchByCategories.toLowerCase())  )       
      }).sort((a,b)=>b.votes-a.votes);
      setFilteredVideos(filteredVideos);
    };
    search()
  }, [searchInput, searchByCategories]);
   

  useEffect(() => {
    const search = () => {
      let filteredVideos = videoDates.filter((video) => {
        console.log(searchByCategories.toLowerCase())
        return  video.categories.includes(searchByCategories.toLowerCase())    
      }).sort((a,b)=>b.votes-a.votes);
      if(searchByCategories!==''){
        setFilteredVideos(filteredVideos);
      }else {
        setFilteredVideos(videoDates.sort((a,b)=>b.votes-a.votes));
      }
      
    };
    search()
  }, [searchByCategories]);

   return (
       <div className="" id="home">
         <SearchBar setSearchInput={setSearchInput}  setSearchByCategories={setSearchByCategories}/>
          <VideoCards videoDates={filteredVideos}/>
       </div>
   );
 };
 
 export default Home;
 