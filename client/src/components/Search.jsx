import React from 'react';

const Search = ({ searchHandler}) => {
//    const handleSearch = ()=>{
//        let filteredVid = videos.filter( video => video.id !== 523427)
//        searchHandler(filteredVid);
//    }
    return ( 
        <div>
        
<input onChange={(e)=>{
    searchHandler(e.target.value)}} placeholder='Search...'/>
        </div>
     );
}
 
export default Search;