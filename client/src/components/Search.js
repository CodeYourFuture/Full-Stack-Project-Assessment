const Search = ({ handleSearch, searchValue }) => {
  return (
    <label htmlFor="search-field">
      <input
        type="text"
        placeholder="type something..."
        value={searchValue}
        onChange={handleSearch}
      ></input>
    </label>
  );
};

export default Search;
