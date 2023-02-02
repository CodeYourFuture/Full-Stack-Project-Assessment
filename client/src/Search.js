import React from 'react';

const Search = ({searchValue, setSearchValue, handleSearch}) => {
    return (
        <div className = "search-box">
            <label><b>Search</b> &nbsp;</label>
            <input type = "text" value={searchValue} onChange={event => {
                setSearchValue(event.target.value);
            }}></input>
            <button onClick={handleSearch}>Search</button>
        </div>
    )
}

export default Search;
