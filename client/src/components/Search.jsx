const Search = ({ handleSearchInput }) => {
  return (
    <div className="search">
      <label>Search</label>
      <input type="text" onChange={handleSearchInput}></input>
    </div>
  );
};
export default Search;
