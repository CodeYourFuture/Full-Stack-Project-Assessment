import React, {useState,useEffect} from "react";
import SearchBar from "./SearchBar";
import VideoCards from "./VideoCards";
import '../styles/home.scss';
import { ThreeDots } from "react-loading-icons";


const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchByCategories, setSearchByCategories] = useState("All");
  const [videos, setVideos]=useState([]);
  const [filteredVideos, setFilteredVideos]=useState(videos);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://cyf-videos.herokuapp.com/videos"
      );
      if (response.ok) {
        const jsonData = await response.json();
        setVideos(jsonData);
        setLoading(false);
      } else {
        setLoading(false);
        setError(true);
        throw new Error("Network response was not ok.");
      }
    };
    fetchData().catch(console.error);
  }, []);



  useEffect(() => {
    const search = () => {
      let filteredVideos = videos.filter((video) => {
        return video.title.toLowerCase().includes(searchInput.toLowerCase())    
      })
      setFilteredVideos(filteredVideos);
    };
    search()

  }, [searchInput,videos]);
   

  useEffect(() => {
    const search = () => {
      let filteredVideos = videos.filter((video) => {

        if(searchByCategories!=='All'){
          return video.categories.includes(searchByCategories.toLowerCase())  }  
      })
      if(searchByCategories!=='All'){
        setFilteredVideos(filteredVideos);
      }else {
        setFilteredVideos(videos)
      }
      
    };
    search()

  }, [searchByCategories,videos]);


   return (
       <div className="" id="home">
         <SearchBar setSearchInput={setSearchInput}  setSearchByCategories={setSearchByCategories} searchByCategories={searchByCategories}/>
        {loading ? (
            <ThreeDots stroke="#FFE61B" style={{margin:"auto"}}/>
          ) : error ? (
            <div>
              {" "}
              <img
                src="https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png"
                width={"50px"}
              />{" "}
              <p className="text-danger">Network response was not ok!</p>
            </div>
          ) : (
            <VideoCards videoDates={filteredVideos}/>
          )}
       </div>
   );
 };
 
 export default Home;
 