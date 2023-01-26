import React, {createContext, useState} from 'react';
import useLocalState from './useLocalState'
import { v4 as uuidv4 } from 'uuid';

export const vidContext = createContext();

const YoutubeVidContextProvider = (props) =>{

    const [search, setSearch] = useState('')
    const [filteredResults, setFilteredResults] = useState([]);
    const [video, setVideo ] = useLocalState('videos', [
        {
          "id": 523523,
          "title": "Never Gonna Give You Up",
          "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          "rating": 0
        }]);

    const filtered = search !== "" 
    ? video
    : video?.filter((vid) =>
        vid.title.toLowerCase().includes(search.toLowerCase())
      );

    const inputHanleChange = (searchValue) => {
    
    setSearch(searchValue);
    if(search !== ''){  
      const filtered = video.filter((vid) => vid.title.toLowerCase().includes(search.toLowerCase())) 
        setFilteredResults(filtered);
    }else{
        setFilteredResults(video);
     }
    }

    const addVideo = (title, url, rating) =>{
        setVideo([...video, {title, url, rating, id: uuidv4()}])       
    }

    const removeVideo = (id) => {
       video && setVideo(video?.filter(vid => vid.id !==id));
    }

    return(
        <vidContext.Provider value={{
            search,
            filtered, 
            setSearch, 
            inputHanleChange, 
            video,
            setVideo, 
            addVideo, 
            removeVideo,
            filteredResults
            }}>
            {props.children}
        </vidContext.Provider>
    )
}

export default YoutubeVidContextProvider;