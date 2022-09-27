import React, {createContext, useState, useEffect} from 'react';
import useLocalState from './useLocalState'
import { v4 as uuidv4 } from 'uuid';
// import {data} from './exampleresponse.json';

export const vidContext = createContext();

 
const YoutubeVidContextProvider = (props) =>{

    const [search, setSearch] = useState(null)
    const [filteredResults, setFilteredResults] = useState([]);
    const [video, setVideo ] = useLocalState('videos', '');

    const filtered = search !== "" 
    ? video
    : video && video?.filter((vid) =>
        vid.title.toLowerCase().includes(search.toLowerCase())
      );
      console.log(filtered)
    const inputHanleChange = (e) => {
     
    console.log('search ttt', video)
    setSearch(e.target.value);
    if(search !== ''){   
        // const filtered = video && video?.filter(video=>video.title.toLocaleLowerCase().includes(search.toLocaleLowerCase))
        setFilteredResults(filtered);
    }else{
        setFilteredResults(video);
     }
    }
    console.log('handel', inputHanleChange)
   useEffect(() => {
    const results = video && video?.filter(video=>video.title?.toLocaleLowerCase().includes(search?.toLocaleLowerCase)
    );
    console.log(results)
    setFilteredResults(results);
  }, [search, video]);

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