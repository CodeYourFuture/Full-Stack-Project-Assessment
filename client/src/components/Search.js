import "./Search.css"


const Search = ({ handleSearch, searchValue }) => {
    return (
    <div className="wrapper">
      <label className="label" htmlFor="search-field">
        SEARCH VIDEOS
      </label>
      <br/>
        <input
          type="text"
          placeholder="type something..."
          value={searchValue}
          onChange={handleSearch}
        ></input>
        </div>
    );
  };
  
  export default Search;