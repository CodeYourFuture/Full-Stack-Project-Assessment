import React from "react";
import { useGlobalContext } from "../context";


const Search = () => {
    const {  searchValue, setSearchValue } = useGlobalContext();
    console.log(searchValue)
    const searchVideos = (e) => {
        setSearchValue(e.target.value)
    }
    return (
        <div className="form-floating m-3">
            <label htmlFor="search">Search</label>
            <input 
            type="text" 
            className="form-control" 
            id="search" 
            placeholder="Search"
            value={searchValue}
            onChange={searchVideos} />
        </div>
    )
}

export default Search;