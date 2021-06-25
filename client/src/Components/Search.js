const Search = ({ searchInput, setSearchInput }) => {
  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };
  return (
    <input
      type="text"
      placeholder="type a name"
      value={searchInput}
      onChange={handleChange}
    ></input>
  );
};

export default Search;
