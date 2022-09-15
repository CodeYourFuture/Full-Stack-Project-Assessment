import React, {useState} from "react";
import '../styles/searchBar.scss';


const SearchBar = ({setSearchInput,setSearchByCategories, searchByCategories}) => {
 
  const handleSearchQuery = (e) => {
    setSearchInput(e.target.value);
  };


  const handleSearchQueryByCateregories=(e)=>{
    let searchQuery = e.target.innerText
    if(searchQuery==='All'){
      setSearchByCategories('All')
    }else{
      setSearchByCategories(searchQuery)
    }
  }
  return (
      <div className="search-bar">
        <div className="options">
          <button onClick={handleSearchQueryByCateregories}  className={searchByCategories==='All'?'btn search-option-btn active-btn':'btn search-option-btn '}>
              All
          </button>
          <button onClick={handleSearchQueryByCateregories}  className={searchByCategories==='Cartoon'?'btn search-option-btn active-btn':'btn search-option-btn' }>
              Cartoon
          </button>
          <button onClick={handleSearchQueryByCateregories}  className={searchByCategories==='Coding'?'btn search-option-btn active-btn':'btn search-option-btn' }>
              Coding
          </button>
          <button onClick={handleSearchQueryByCateregories}  className={searchByCategories==='Comedy'?'btn search-option-btn active-btn':'btn search-option-btn' }>
              Comedy
          </button>
          <button onClick={handleSearchQueryByCateregories}  className={searchByCategories==='Education'?'btn search-option-btn active-btn':'btn search-option-btn' }>
              Education 
          </button>
          <button onClick={handleSearchQueryByCateregories}  className={searchByCategories==='Music'?'btn search-option-btn active-btn':'btn search-option-btn' }>
              Music
          </button>
        
          <button onClick={handleSearchQueryByCateregories}  className={searchByCategories==='Recipe'?'btn search-option-btn active-btn':'btn search-option-btn '}>
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
