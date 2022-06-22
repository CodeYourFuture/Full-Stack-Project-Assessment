import React from "react";
import '../styles/searchBar.scss';
// import data from '../data/data.json';


const SearchBar = ({setSearchInput,setSearchByCategories}) => {

  const handleSearchQuery = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchQueryByCateregories=(e)=>{
    let searchQuery = e.target.innerText
    if(searchQuery==='All'){
      setSearchByCategories('')
    }else{
      setSearchByCategories(searchQuery)
    }
  }
  return (
      <div className="search-bar">
        <div className="options">
          <button onClick={handleSearchQueryByCateregories}  className="btn search-option-btn active-btn">
              All
          </button>
          <button onClick={handleSearchQueryByCateregories}  className="btn search-option-btn">
              Cartoon
          </button>
          <button onClick={handleSearchQueryByCateregories}  className="btn search-option-btn">
              Coding
          </button>
          <button onClick={handleSearchQueryByCateregories}  className="btn search-option-btn">
              Education 
          </button>
          <button onClick={handleSearchQueryByCateregories}  className="btn search-option-btn">
              Music
          </button>
          
          <button onClick={handleSearchQueryByCateregories}  className="btn search-option-btn">
              Movie
          </button>
          <button onClick={handleSearchQueryByCateregories}  className="btn search-option-btn">
              Recipe
          </button>
        </div>
          <form className="search-form">
            <input
              type="search"
              onChange={handleSearchQuery}
              placeholder="Search..."
            />
          </form>
        </div>
  );
};

export default SearchBar;
