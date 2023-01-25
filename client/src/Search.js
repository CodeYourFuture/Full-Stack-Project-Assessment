import React from 'react';


const Search = ({searchValue, setSearchValue}) => {
    return (
        <div className = "search-box">
            <label>Search</label>
            <input type = "text" value={searchValue} onChange={event => {
                setSearchValue(event.target.value);
            }}></input>
        </div>
    )
}

export default Search;