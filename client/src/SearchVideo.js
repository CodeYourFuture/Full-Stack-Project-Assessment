import React from 'react';

const SearchVideo = ({inputValue, setInputValue}) => {
 

 const searchInputHandler = (e) => {
     setInputValue(e.target.value);
 }

    return (
        <div>
             <label>Search </label>
             <input type="text" value={inputValue} onChange={searchInputHandler} placeholder="Search for video"></input>
        </div>
    )
}

export default SearchVideo;
