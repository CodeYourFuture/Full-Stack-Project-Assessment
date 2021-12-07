import React from 'react'
import { Link } from 'react-router-dom'

function Search({videos,setVideos}) {

    function handleSearchInput(event) {
        const searchResualt = videos.filter( video => video.title.toLowerCase().includes(event.target.value.toLowerCase()))
        setVideos(searchResualt)
 
      }
     
    
    return (
        <div className="d-flex flex-row justify-content-between p-3">
            
              <form className="d-flex flex-row ">
                <input className="form-control  "  onChange={handleSearchInput} type="search" placeholder="Search" aria-label="Search"/>
               </form>
           
            <div>
            <Link to="/addVideo">
          <button className="btn  text-info m-2 ">Add Video</button>
        </Link>
            </div>
        </div>
    )
}

export default Search
