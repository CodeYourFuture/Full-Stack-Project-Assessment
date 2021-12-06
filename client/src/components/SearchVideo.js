import React from 'react';

 export default function SearchVideo ({setVideos, videos}) {
  
     function handleSearchInput(event) {
       const searchedVideo = videos.filter( video => video.title.toLowerCase().includes(event.target.value.toLowerCase()))
       setVideos(searchedVideo)

     }

     return (
       <form className="form-group search-box">
         <div className="search-row">
           <input
             type="text"
             id="search-video"
             className="form-control"
             placeholder="search video..."
             onChange={handleSearchInput}
           />
           <button type="submit" className="btn btn-primary">
             <i className="fas fa-search"></i>
           </button>
         </div>
       </form>
     );
 }