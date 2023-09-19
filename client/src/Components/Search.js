const Search = ({ setKeyword }) => {
  return (
    <div className="input-group mb-3 news-input">
      <input
        type="text"
        className="form-control "
        placeholder="Search video by name..."
        aria-label="Search video input"
        key="search-bar"
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
      />
      {/* <button className="btn btn-danger text-light" type="button">
        Search
      </button> */}
    </div>
  );
};
export default Search;
