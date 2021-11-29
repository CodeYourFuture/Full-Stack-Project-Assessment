const SearchBar = () => {
  return (
    <div className="search-container justify-content-center">
      <label
        htmlFor="title"
        className="search-bar w-50 navbar navbar-light bg-info m-3 justify-content-center"
      >
        Search
        <input type="text" id="title" className="form-control" />
      </label>
    </div>
  );
};

export default SearchBar;
