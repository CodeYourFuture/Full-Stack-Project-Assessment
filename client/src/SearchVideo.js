import React from 'react';

const SearchVideo = ({inputValue, setInputValue}) => {
 

    return (
        <div>
             <label>Search</label>
             <input type="text" value={inputValue} onChange={event => {
          setInputValue(event.target.value);
        }}></input>
        </div>
    )
}

export default SearchVideo;
