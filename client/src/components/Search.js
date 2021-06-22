const Search = ({ handleSearch, searchValue }) => {
 
  return (
    // <>
    //   <label htmlFor="search-field">
    //     Search
    //     <input onChange={handleSearch} type="text" value={searchValue} />
    //   </label>
    // </>

    <input
      type="text"
      placeholder="type a name"
      value={searchValue}
      onChange={handleSearch}
    ></input>
  );
};

export default Search;
