import React from 'react'
import "./Search.css";
function Search({search, handleSearch}) {
    return (
    <div >
        <form >
            <div >
                <label className="lb" >Search</label>
                <input 
                    type="text" 
                    className="serach-input" 
                    onChange={handleSearch}
                    value={search} 
                    id="search"
                    placeholder=""                        
                />
            </div>
        </form>
    </div>
    )
    
}

export default Search
